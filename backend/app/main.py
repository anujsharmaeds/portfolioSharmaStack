from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from app.routers import contact
from app.core.database import db

load_dotenv()

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

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
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
