"""Backend tests for Contact Form feature (POST /api/contact)"""
import os
import time
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load backend .env to get MONGO_URL/DB_NAME
load_dotenv(Path(__file__).resolve().parents[1] / '.env')

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://premium-spirits-ui.preview.emergentagent.com').rstrip('/')
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']

mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _valid_payload(**overrides):
    p = {
        "first_name": "TEST_John",
        "last_name": "Doe",
        "email": "test_john@example.com",
        "phone": "+91-9876543210",
        "subject": "Inquiry about premium wines",
        "message": "Hello, I want to know more about your premium collection. Please advise.",
    }
    p.update(overrides)
    return p


# --- Health / connectivity ---
class TestHealth:
    def test_root_api(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# --- Contact Form ---
class TestContactForm:
    submitted_ids = []

    def test_happy_path_submission(self, api):
        payload = _valid_payload()
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "success"
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "email_sent" in data and isinstance(data["email_sent"], bool)
        TestContactForm.submitted_ids.append(data["id"])

        # Verify Mongo persistence (allow brief async delay)
        time.sleep(0.5)
        doc = db.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None, "Submission not persisted in MongoDB"
        assert doc["first_name"] == payload["first_name"]
        assert doc["last_name"] == payload["last_name"]
        assert doc["email"] == payload["email"]
        assert doc["phone"] == payload["phone"]
        assert doc["subject"] == payload["subject"]
        assert doc["message"] == payload["message"]
        assert "created_at" in doc
        assert "email_sent" in doc
        # email_sent should align with response
        assert doc["email_sent"] == data["email_sent"]

    def test_missing_required_fields_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"first_name": "TEST_Only"})
        assert r.status_code == 422

    def test_missing_email_returns_422(self, api):
        payload = _valid_payload()
        del payload["email"]
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_invalid_email_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json=_valid_payload(email="not-an-email"))
        assert r.status_code == 422

    def test_empty_first_name_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json=_valid_payload(first_name=""))
        assert r.status_code == 422

    def test_backend_accepts_one_char_message(self, api):
        # Frontend enforces >=10 chars, backend min_length=1
        r = api.post(f"{BASE_URL}/api/contact", json=_valid_payload(message="A", subject="S"))
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "success"
        TestContactForm.submitted_ids.append(data["id"])

        doc = db.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None
        assert doc["message"] == "A"

    def test_phone_optional(self, api):
        payload = _valid_payload()
        payload.pop("phone")
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        TestContactForm.submitted_ids.append(data["id"])
        doc = db.contact_submissions.find_one({"id": data["id"]})
        assert doc is not None
        assert doc.get("phone", "") == ""

    @classmethod
    def teardown_class(cls):
        if cls.submitted_ids:
            db.contact_submissions.delete_many({"id": {"$in": cls.submitted_ids}})
