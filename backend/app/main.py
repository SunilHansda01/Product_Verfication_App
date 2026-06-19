from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base
from app.db.database import engine

from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.verification import router as verification_router
from app.api.reports import router as reports_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product Verification System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(verification_router)
app.include_router(reports_router)