from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
import hashlib
from io import BytesIO
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from PIL import Image, ImageOps
import requests
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
IMAGE_CACHE_DIR = ROOT_DIR / ".image-cache"
IMAGE_CACHE_DIR.mkdir(exist_ok=True)
IMAGE_FETCH_TIMEOUT = 12

IMAGE_SOURCES = {
    "logo": "https://customer-assets.emergentagent.com/job_d3158cd7-9e2a-4764-8ae8-32eafb7d67a9/artifacts/9wxmcvnh_image.png",
    "hero-home": "https://images.unsplash.com/photo-1767969217452-3cc1eb722703",
    "hero-collection": "https://images.unsplash.com/photo-1674916084024-50cdd3f6b864",
    "about-hero": "https://images.unsplash.com/photo-1627503607711-3b427348cbd7",
    "about-story": "https://images.unsplash.com/photo-1758790121744-0ead6c5e63fe",
    "category-whiskey": "https://images.unsplash.com/photo-1527281400683-1aae777175f8",
    "category-scotch": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
    "category-wine": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
    "category-vodka": "https://images.unsplash.com/photo-1759912316272-a414bf146476",
    "category-rum": "https://kuhns.shop/cdn/shop/files/OldMonkRum-Kuhns.jpg?v=1704253243&width=1600",
    "category-gin": "https://delhidutyfree.co.in/media/catalog/product/cache/c3073cf0652b87af145d4aff9d92466d/2/0/2000077_1.webp",
    "category-beer": "https://thumbs.dreamstime.com/b/bottles-famous-global-beer-brands-poznan-pol-mar-including-heineken-becks-bud-miller-corona-stella-artois-san-miguel-143170440.jpg",
    "category-liquor": "https://img.magnific.com/free-photo/barman-filling-glass-alcohol_8353-12083.jpg?semt=ais_test_b&w=740&q=80",
    "product-glenlivet-18": "https://ik.imagekit.io/cvygf2xse/theglenlivet/wp-content/uploads/2021/10/SETUP3_Serve_18YO_6x7.png?tr=q-80,w-900",
    "product-indri-single-malt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6P8PE-cIXE6yV5RO6GJDDEXhThqB8-Nkjz0Ff9qgFbxoYrjZv4aFMe8&s=10",
    "product-jack-daniels-black": "https://images.unsplash.com/photo-1527281400683-1aae777175f8",
    "product-jw-blue-label": "https://images.ctfassets.net/3agjva8gbrgl/2gzZbpv6HGbUgwdCfwY0BA/6d63410d42d34b5011fa4a121ff70802/jw-blue-serve-lunar25.jpg",
    "product-grey-goose": "https://www.greygoose.com/binaries/content/gallery/greygoose/products/grey-goose-altius/product-card.jpg",
    "product-jaisalmer-gin": "https://chipsliquor.com/cdn/shop/files/JaisalmerGin_1024x1024.jpg?v=1698510698",
    "product-jagermeister": "https://www.cavelusa.pt/wp-content/uploads/2025/09/jagermeister_3.jpg.webp",
    "product-sangam": "https://www.just-drinks.com/wp-content/uploads/sites/29/2024/08/Sangam-1-683x1024.jpg",
    "product-singha": "https://d1ynl4hb5mx7r8.cloudfront.net/wp-content/uploads/2023/05/10113315/722090709.863a0f9d7bbe7098aff67e1952dbcf44.jpg",
    "product-hoegaarden": "https://www.africaneasternonline.com/media/catalog/product/9/0/90220013_2.png",
}

IMAGE_EXTENSIONS = {
    "WEBP": ("webp", "image/webp"),
    "JPEG": ("jpg", "image/jpeg"),
    "PNG": ("png", "image/png"),
}

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


def _clamp_int(value, default, minimum, maximum):
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return default
    return max(minimum, min(parsed, maximum))


def _accepts_webp(request: Request) -> bool:
    return "image/webp" in request.headers.get("accept", "")


def _image_cache_path(image_id: str, source_url: str, width: int, height: int, quality: int, fit: str, fmt: str) -> Path:
    ext = IMAGE_EXTENSIONS[fmt][0]
    key = f"{image_id}:{source_url}:{width}:{height}:{quality}:{fit}:{fmt}"
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()[:24]
    return IMAGE_CACHE_DIR / f"{image_id}-{digest}.{ext}"


def _resize_and_cache_image(source_url: str, cache_path: Path, width: int, height: int, quality: int, fit: str, fmt: str):
    upstream = requests.get(
        source_url,
        timeout=IMAGE_FETCH_TIMEOUT,
        headers={"User-Agent": "RajanWinesImageOptimizer/1.0"},
    )
    upstream.raise_for_status()

    with Image.open(BytesIO(upstream.content)) as img:
        img = ImageOps.exif_transpose(img)
        target_size = (width, height) if height else None

        if target_size and fit == "cover":
            img = ImageOps.fit(img, target_size, method=Image.Resampling.LANCZOS)
        else:
            resize_height = height if height else 4096
            img.thumbnail((width, resize_height), Image.Resampling.LANCZOS)

        if fmt in {"WEBP", "JPEG"} and img.mode not in ("RGB", "L"):
            img = img.convert("RGB")

        tmp_path = cache_path.with_suffix(cache_path.suffix + ".tmp")
        save_kwargs = {"quality": quality, "optimize": True}
        if fmt == "JPEG":
            save_kwargs["progressive"] = True
        img.save(tmp_path, fmt, **save_kwargs)
        tmp_path.replace(cache_path)


@api_router.get("/images/{image_id}")
async def optimized_image(
    image_id: str,
    request: Request,
    w: Optional[int] = None,
    h: Optional[int] = None,
    q: Optional[int] = None,
    fit: str = "cover",
):
    source_url = IMAGE_SOURCES.get(image_id)
    if not source_url:
        raise HTTPException(status_code=404, detail="Unknown image")

    width = _clamp_int(w, 800, 32, 2400)
    height = _clamp_int(h, 0, 0, 2400)
    quality = _clamp_int(q, 76, 35, 90)
    fit = fit if fit in {"cover", "contain"} else "cover"
    fmt = "WEBP" if _accepts_webp(request) else "JPEG"
    if image_id == "logo":
        fmt = "PNG" if not _accepts_webp(request) else "WEBP"

    cache_path = _image_cache_path(image_id, source_url, width, height, quality, fit, fmt)
    cache_hit = cache_path.exists()
    if not cache_hit:
        try:
            await asyncio.to_thread(
                _resize_and_cache_image,
                source_url,
                cache_path,
                width,
                height,
                quality,
                fit,
                fmt,
            )
        except Exception as e:
            logger.error(f"Image optimization failed for {image_id}: {e}")
            stale_matches = sorted(IMAGE_CACHE_DIR.glob(f"{image_id}-*.{IMAGE_EXTENSIONS[fmt][0]}"), key=lambda p: p.stat().st_mtime, reverse=True)
            if not cache_path.exists() and not stale_matches:
                raise HTTPException(status_code=502, detail="Image source unavailable")
            if not cache_path.exists():
                cache_path = stale_matches[0]
                cache_hit = True

    body = await asyncio.to_thread(cache_path.read_bytes)
    etag = hashlib.sha256(body).hexdigest()
    if request.headers.get("if-none-match") == etag:
        return Response(status_code=304, headers={"ETag": etag})

    return Response(
        content=body,
        media_type=IMAGE_EXTENSIONS[fmt][1],
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "ETag": etag,
            "X-Image-Cache": "HIT" if cache_hit else "MISS",
        },
    )

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
