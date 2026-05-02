from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Portfolio API"
    DEBUG: bool = False  # Default to False
    VERSION: str = "1.0.0"
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB: str = "portfolio_db"
    
    # Redis
    REDIS_URL: Optional[str] = None  # Make optional
    
    # Email
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAIL_FROM: str = "noreply@anujsharma.dev"
    
    # Security
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    
    # Telegram Notifications
    TELEGRAM_BOT_TOKEN:str = "8193259321:AAGAbHgFXHjN2RUPC_ZPvIAx-vf56IEMwtM"
    TELEGRAM_CHAT_ID:str = "6741467182"
    
    # Analytics
    GOOGLE_ANALYTICS_ID: Optional[str] = None
    
    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields in .env

settings = Settings()
