from datetime import date
from pydantic import BaseModel


class ProductResponse(BaseModel):
    wid: str
    ean: str
    manufacturing_date: date
    expiry_date: date

    class Config:
        from_attributes = True