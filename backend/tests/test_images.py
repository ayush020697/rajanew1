"""Unit tests for optimized image delivery."""
import os
import sys
from io import BytesIO
from pathlib import Path

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "test_db")
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient
from PIL import Image

import server


class DummyResponse:
    def __init__(self, content):
        self.content = content

    def raise_for_status(self):
        return None


def _png_bytes():
    buf = BytesIO()
    Image.new("RGB", (64, 64), "#d97706").save(buf, "PNG")
    return buf.getvalue()


def test_known_image_returns_cached_webp(monkeypatch, tmp_path):
    monkeypatch.setattr(server, "IMAGE_CACHE_DIR", tmp_path)
    calls = {"count": 0}

    def fake_get(*args, **kwargs):
        calls["count"] += 1
        return DummyResponse(_png_bytes())

    monkeypatch.setattr(server.requests, "get", fake_get)
    client = TestClient(server.app)

    first = client.get("/api/images/logo?w=48&h=48", headers={"Accept": "image/webp"})
    second = client.get("/api/images/logo?w=48&h=48", headers={"Accept": "image/webp"})

    assert first.status_code == 200
    assert first.headers["content-type"] == "image/webp"
    assert first.headers["cache-control"] == "public, max-age=31536000, immutable"
    assert second.status_code == 200
    assert calls["count"] == 1


def test_unknown_image_returns_404():
    client = TestClient(server.app)
    response = client.get("/api/images/not-allowed")

    assert response.status_code == 404


def test_cached_image_supports_etag(monkeypatch, tmp_path):
    monkeypatch.setattr(server, "IMAGE_CACHE_DIR", tmp_path)
    monkeypatch.setattr(server.requests, "get", lambda *args, **kwargs: DummyResponse(_png_bytes()))
    client = TestClient(server.app)

    first = client.get("/api/images/logo?w=48&h=48", headers={"Accept": "image/webp"})
    etag = first.headers["etag"]
    second = client.get("/api/images/logo?w=48&h=48", headers={"Accept": "image/webp", "If-None-Match": etag})

    assert second.status_code == 304
