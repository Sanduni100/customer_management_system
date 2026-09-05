# Full-Stack Form Management System

A full-stack web application with JWT authentication, role-based access control (CUSTOMER / ADMIN),
and a CRUD form submission system with filtering and search — built for the Evotec technical assignment.

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Node.js + Express.js
- **Database:** MySQL (via Sequelize ORM)
- **Auth:** JWT (access + refresh tokens), bcrypt password hashing

## Project Structure

```
.
├── backend/     # Express API server
└── frontend/    # Next.js application
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MySQL 8+ running locally (or a reachable instance)

### 1. Database
Create a MySQL database:
```sql
CREATE DATABASE evotec_assignment;
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# edit .env with your MySQL credentials and JWT secrets
npm install
npm run seed     # creates the initial super admin account
npm run dev       # starts the API on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev       # starts the app on http://localhost:3000
```

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`.

## API Documentation

See [`backend/README.md`](./backend/README.md) for full endpoint documentation.

## Default Super Admin

After running `npm run seed` in `backend/`, a super admin is created using the credentials
defined by `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env`. Use this account to log in
at `/admin/login` and create further admin accounts via the protected admin-creation endpoint.

## Git Workflow

This repo was built incrementally on feature branches, each merged into `main`:

- `feature/backend-auth` — user model, JWT auth, registration/login, admin creation
- `feature/backend-forms` — form submission model, customer + admin CRUD/filter/search routes
- `feature/frontend-setup` — Next.js scaffold, layout, API client, home page
- `feature/frontend-customer` — customer register/login/application pages
- `feature/frontend-admin` — admin login + dashboard page
