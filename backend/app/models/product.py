from sqlalchemy import Column, String, Date

from app.db.database import Base


class Product(Base):
    __tablename__ = "verification_products"

    wid = Column(String, primary_key=True)
    ean = Column(String, nullable=False)
    manufacturing_date = Column(Date)
    expiry_date = Column(Date)