from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend email config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT_EMAIL = os.environ.get('CONTACT_RECIPIENT_EMAIL', 'rajanwines2001@gmail.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ====================
# Contact Form Models & Endpoint
# ====================
class ContactSubmissionCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=30)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactSubmissionResponse(BaseModel):
    id: str
    status: str
    message: str
    email_sent: bool


def _build_email_html(payload: ContactSubmissionCreate, submission_id: str) -> str:
    def safe(v):
        return (v or "").replace("<", "&lt;").replace(">", "&gt;")
    return f"""
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 12px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#18181b;border:1px solid rgba(217,119,6,0.25);border-radius:14px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,#78350f 0%,#d97706 100%);padding:24px 28px;">
            <div style="font-size:11px;letter-spacing:3px;color:#fde68a;text-transform:uppercase;">Rajan Wines</div>
            <div style="font-size:22px;color:#ffffff;font-weight:700;margin-top:6px;">New Contact Form Submission</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;color:#e4e4e7;font-size:14px;line-height:1.6;">
            <table width="100%" cellpadding="6" cellspacing="0">
              <tr><td width="120" style="color:#a1a1aa;">Name</td><td style="color:#ffffff;font-weight:600;">{safe(payload.first_name)} {safe(payload.last_name)}</td></tr>
              <tr><td style="color:#a1a1aa;">Email</td><td style="color:#fbbf24;"><a href="mailto:{safe(payload.email)}" style="color:#fbbf24;text-decoration:none;">{safe(payload.email)}</a></td></tr>
              <tr><td style="color:#a1a1aa;">Phone</td><td style="color:#ffffff;">{safe(payload.phone) or '—'}</td></tr>
              <tr><td style="color:#a1a1aa;">Subject</td><td style="color:#ffffff;font-weight:600;">{safe(payload.subject)}</td></tr>
            </table>
            <div style="margin-top:24px;padding:18px 20px;background:#0a0a0a;border-left:3px solid #d97706;border-radius:6px;color:#e4e4e7;white-space:pre-wrap;">{safe(payload.message)}</div>
            <div style="margin-top:24px;font-size:11px;color:#71717a;">Submission ID: {submission_id}</div>
          </td>
        </tr>
        <tr>
          <td style="background:#09090b;padding:14px 28px;font-size:11px;color:#71717a;text-align:center;">
            Sent from the Rajan Wines website contact form
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
""".strip()


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact(payload: ContactSubmissionCreate):
    submission_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    # 1) Always store in MongoDB first (backup, never lost)
    doc = {
        "id": submission_id,
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "email": payload.email,
        "phone": payload.phone or "",
        "subject": payload.subject,
        "message": payload.message,
        "created_at": created_at,
        "email_sent": False,
        "email_error": None,
    }
    try:
        await db.contact_submissions.insert_one(dict(doc))
    except Exception as e:
        logger.error(f"Failed to store contact submission in MongoDB: {e}")
        raise HTTPException(status_code=500, detail="Could not save your message. Please try again.")

    # 2) Send email via Resend (non-blocking)
    email_sent = False
    email_error = None
    if not resend.api_key:
        email_error = "RESEND_API_KEY not configured"
        logger.error(email_error)
    else:
        params = {
            "from": SENDER_EMAIL,
            "to": [CONTACT_RECIPIENT_EMAIL],
            "reply_to": payload.email,
            "subject": f"[Rajan Wines Contact] {payload.subject}",
            "html": _build_email_html(payload, submission_id),
        }
        try:
            result = await asyncio.to_thread(resend.Emails.send, params)
            email_sent = bool(result and result.get("id"))
            logger.info(f"Contact email sent. Resend id={result.get('id') if result else None}")
        except Exception as e:
            email_error = str(e)
            logger.error(f"Resend email send failed: {e}")

    # 3) Update MongoDB record with email delivery status
    try:
        await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"email_sent": email_sent, "email_error": email_error}},
        )
    except Exception as e:
        logger.error(f"Failed to update email status in MongoDB: {e}")

    # 4) Return success — message is saved either way; surface email status truthfully
    return ContactSubmissionResponse(
        id=submission_id,
        status="success",
        message=(
            "Thank you! Your message has been received. We'll get back to you soon."
            if email_sent
            else "Thank you! Your message has been saved. We'll be in touch shortly."
        ),
        email_sent=email_sent,
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()