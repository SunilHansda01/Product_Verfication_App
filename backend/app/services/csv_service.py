import pandas as pd
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.product import Product


def upload_csv(file, db: Session):

    df = pd.read_csv(file.file)

    inserted = 0

    for _, row in df.iterrows():

        product = Product(
            wid=str(row["WID"]).strip(),
            ean=str(row["EAN"]).strip(),
            manufacturing_date=datetime.strptime(
                str(row["Manufacturing_Date"]).strip(),
                "%d-%m-%Y"
            ).date(),
            expiry_date=datetime.strptime(
                str(row["Expiry_Date"]).strip(),
                "%d-%m-%Y"
            ).date()
        )

        db.merge(product)

        inserted += 1

    db.commit()

    return inserted