import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routers import contact
from app.core.database import db

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await db.connect()
    print("✅ Database connected")
    yield
    # Shutdown
    await db.disconnect()
    print("❌ Database disconnected")

app = FastAPI(
    title="Anuj Sharma Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
frontend_url = os.getenv("FRONTEND_URL", "")
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]
if frontend_url:
    origins.extend([url.strip() for url in frontend_url.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "portfolio-api",
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    return {
        "message": "Welcome to Anuj Sharma Portfolio API",
        "endpoints": {
            "contact": "/api/contact",
            "health": "/api/health",
            "docs": "/api/docs"
        }
    }
