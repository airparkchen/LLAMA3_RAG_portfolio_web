# backend/app/config.py
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Personal Portfolio API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY")
    
    BASE_DIR: Path = Path(__file__).resolve().parent
    UPLOAD_DIR: Path = BASE_DIR / "uploads"
    
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]
    
    def __init__(self):
        self.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

settings = Settings()