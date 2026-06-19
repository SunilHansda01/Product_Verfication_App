import os
import uuid

from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import Form
from fastapi import HTTPException
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.product import Product
from app.models.verification_log import VerificationLog
from app.models.user_model import User

from app.core.dependencies import operator_required

router = APIRouter(
    prefix="/verification",
    tags=["Verification"]
)

@router.post("/")
async def verify_product(
    wid: str = Form(...),
    image: UploadFile = File(...),
    current_user: User = Depends(operator_required),
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.wid == wid)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    os.makedirs(
        "uploads/images",
        exist_ok=True
    )

    filename = (
        f"{uuid.uuid4()}_{image.filename}"
    )

    image_path = (
        f"uploads/images/{filename}"
    )

    with open(image_path, "wb") as file:
        file.write(
            await image.read()
        )

    log = VerificationLog(
        wid=wid,
        operator=current_user.username,
        image_path=image_path
    )

    db.add(log)
    db.commit()

    return {
        "message": "Product verified successfully",
        "verified_by": current_user.username,
        "wid": product.wid,
        "ean": product.ean,
        "manufacturing_date": product.manufacturing_date,
        "expiry_date": product.expiry_date,
        "image_path": image_path
    }