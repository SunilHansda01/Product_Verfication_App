import os

from fastapi import APIRouter
from fastapi import Form
from fastapi import File
from fastapi import UploadFile
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.product import Product
from app.models.verification_log import VerificationLog

router = APIRouter(
    prefix="/verification",
    tags=["Verification"]
)


@router.post("/")
async def verify_product(
    wid: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.wid == wid
    ).first()

    if not product:
        return {"message": "Product not found"}

    image_path = f"uploads/images/{image.filename}"

    with open(image_path, "wb") as f:
        f.write(await image.read())

    log = VerificationLog(
        wid=wid,
        operator="operator",
        image_path=image_path
    )

    db.add(log)
    db.commit()

    return {
        "wid": product.wid,
        "ean": product.ean,
        "manufacturing_date": product.manufacturing_date,
        "expiry_date": product.expiry_date
    }