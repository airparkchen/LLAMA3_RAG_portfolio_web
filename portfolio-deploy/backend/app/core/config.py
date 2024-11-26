# backend/app/core/config.py
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Personal Portfolio API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY")
    
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    UPLOAD_DIR: Path = BASE_DIR / "uploads"
    
    # RAG 相關設定
    VECTOR_STORE_PATH: Path = BASE_DIR / "models" / "resume_store"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    CHUNK_SIZE: int = 200
    CHUNK_OVERLAP: int = 20
    
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]
    
    def __init__(self):
        self.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        self.VECTOR_STORE_PATH.mkdir(parents=True, exist_ok=True)

settings = Settings()

# 重要：確保這個變數被導出
__all__ = ['settings']