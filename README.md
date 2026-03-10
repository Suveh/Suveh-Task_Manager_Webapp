# Mini Task Management System

## Project Overview
This project is a full-stack web application developed using **Next.js (Frontend)** and **Spring Boot (Backend)**.  
The system allows users to register, log in, and manage tasks securely using JWT authentication.

The system supports role-based access control with two roles:
- ADMIN
- USER

## Technologies Used

Frontend
- Next.js
- TypeScript
- Axios
- Tailwind CSS

Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST API

Database
- MySQL

---

# Features

Authentication
- User Registration
- User Login
- JWT Token Authentication

Task Management
- Create Tasks
- Update Tasks
- Delete Tasks
- View Tasks

Task Properties
- Title
- Description
- Status (TODO, IN_PROGRESS, DONE)
- Priority (LOW, MEDIUM, HIGH)
- Due Date

Role-Based Access
- ADMIN can view all tasks
- USER can manage only their tasks

---

# Project Structure


taskmanager
│
├── backend # Spring Boot backend
├── frontend # Next.js frontend
├── database # Database schema
├── docs # API documentation
└── README.md


---

# Setup Instructions

## Backend

Navigate to backend folder:
cd backend


Run the Spring Boot application:
mvn spring-boot:run


Backend runs on:
http://localhost:8080


---

## Frontend

Navigate to frontend folder:
cd frontend


Install dependencies:
npm install


Run the application:
npm run dev


Frontend runs on:
http://localhost:3000


---

# Database Configuration

Database schema is available in:
database/schema.sql


Create the database and import the schema before running the backend.

---

# API Documentation

Full API documentation is available in:
docs/api-documentation.md


---

# Environment Variables

Backend environment variables:
JWT_SECRET
DB_USERNAME
DB_PASSWORD
DB_URL


---

# Author

Suventhini Sivalingam
Student Project – Mini Task Management System