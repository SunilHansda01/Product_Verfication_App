from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session  # type: ignore[import]

from app.db.database import get_db
from app.services.csv_service import upload_csv

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/upload")
def upload_products(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    count = upload_csv(file, db)

    return {
        "inserted_records": count
    }