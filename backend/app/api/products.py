from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session  # type: ignore[import]

from app.db.database import get_db
from app.services.csv_service import upload_csv_service

from app.core.dependencies import admin_required

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/upload")
def upload_csv(
    file: UploadFile,
    current_user=Depends(admin_required),
    db: Session = Depends(get_db)
):
    print(
        f"{current_user.username} uploaded a file"
    )
    count = upload_csv_service(file, db)

    return {
        "uploaded_by": current_user.username,
        "inserted_records": count
    }