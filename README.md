# Product_Verfication_App
App to verify products from a warehouse


# Product Verification System

## Overview

This project is a Product Verification System built as part of the Flipkart technical assignment.

The system allows administrators to bulk upload product information through CSV files, enables warehouse operators to verify products using a unique product identifier, and provides reporting capabilities for tracking verification activities.

The solution is built using:

* Backend: FastAPI
* Frontend: Angular
* Database: MySQL
* Authentication: JWT-based authentication
* Authorization: Role-Based Access Control (Admin / Operator)

---

# Features

## User Authentication

* User Registration
* User Login
* JWT Token Authentication
* Password Hashing
* Role-Based Access Control

### Supported Roles

#### Admin

* Create users
* Upload product CSV files
* Access verification reports

#### Operator

* Verify products
* Record verification activity

---

## Product Management

### CSV Upload

Administrators can upload CSV files containing product information.

Supported fields:

| Field        | Description               |
| ------------ | ------------------------- |
| product_id   | Unique product identifier |
| name         | Product name              |
| category     | Product category          |
| manufacturer | Manufacturer name         |

Uploaded products are stored in the database and can later be verified by warehouse operators.

---

## Product Verification

Warehouse operators can verify products using the product identifier.

Verification results include:

* Product Found
* Product Not Found

Each verification attempt is logged for reporting purposes.

---

## Verification Logging

Every verification activity is recorded with:

* Product ID
* Verification Status
* User who performed verification
* Timestamp

This provides a complete audit trail of warehouse verification activity.

---

## Reports

Administrators can generate reports for a selected date range.

Report metrics include:

* Total Verification Attempts
* Successful Verifications
* Failed Verifications

---

# System Architecture

Frontend (Angular)

↓

REST APIs

↓

Backend (FastAPI)

↓

Postgresql Database

---

# Technology Stack

## Backend

* Python 3.12+
* FastAPI
* SQLAlchemy
* Pydantic
* Passlib
* JWT Authentication

## Frontend

* Angular
* TypeScript
* Bootstrap 5

## Database

* MySQL

---

# Project Structure

```text
project-root/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
└── README.md
```

---

# Backend Setup

## Prerequisites

* Python 3.12+
* MySQL Server

---

## Clone Repository

```bash
git clone <repository-url>
cd product-verification-system
```

---

## Create Virtual Environment

```bash
cd backend

python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost/product_verification

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Create Database

```sql
CREATE DATABASE product_verification;
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend will start on:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

# Frontend Setup

## Install Dependencies

```bash
cd frontend

npm install
```

---

## Run Angular Application

```bash
ng serve
```

Application will be available at:

```text
http://localhost:4200
```

---

# API Overview

## Authentication

### Register User

```http
POST /auth/create-user
```

### Login

```http
POST /auth/login
```

Returns JWT access token.

---

## Products

### Upload CSV

```http
POST /products/upload
```

Authorization:

Admin only

---

## Verification

### Verify Product

```http
POST /verify
```

Authorization:

Operator only

---

## Reports

### Get Verification Report

```http
GET /reports
```

Parameters:

```text
start_date
end_date
```

Authorization:

Admin only

---

# Sample Workflow

## Admin

1. Login as Admin
2. Upload Product CSV
3. Review uploaded products

## Operator

1. Login as Operator
2. Search product by Product ID
3. Verify product
4. Verification activity is logged

## Admin

1. Generate report
2. Review verification statistics

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected Endpoints
* Role-Based Authorization
* Input Validation using Pydantic

---

# Scalability Considerations

The solution has been designed with scalability in mind:

* Layered architecture (API, Service, Database)
* SQLAlchemy ORM for database abstraction
* Efficient database lookups using Product ID
* Verification logging for auditability
* Modular code structure for future enhancements

Potential future improvements:

* Asynchronous CSV processing
* Pagination for reports
* Dashboard analytics
* Docker deployment
* Background job processing

---

# Assumptions

* Product IDs are unique.
* Users are assigned either Admin or Operator roles.
* CSV files follow the expected schema.
* Authentication is required for all protected operations.

---

# Assignment Coverage

✔ User Authentication
✔ Role-Based Access Control
✔ CSV Product Upload
✔ Product Verification
✔ Verification Logging
✔ Reporting
✔ FastAPI Backend
✔ Angular Frontend
✔ MySQL Database
✔ API Documentation

---

# Author

Sunil Hansda
