# Backend — Evotec Assignment API

Express.js + MySQL (Sequelize) REST API providing JWT authentication, role-based access
control, and form submission CRUD with filtering/search.

## Database Tables

Customers and admins are kept in **separate tables**, not a single `users` table with a role column:

- `customers` — created via `/api/auth/register`
- `admins` — created via the seed script and via the protected `/api/auth/admin` endpoint
- `form_submissions` — references `customers.id` via `createdByCustomerId`

See [`schema.sql`](./schema.sql) for the raw DDL if you'd rather create tables manually
instead of letting `sequelize.sync()` do it on server start.

## Setup

```bash
cp .env.example .env   # fill in your MySQL credentials + JWT secrets
npm install
npm run seed            # creates the super admin from SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD
npm run dev
```

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint              | Access           | Description                                      |
|--------|-----------------------|------------------|---------------------------------------------------|
| POST   | `/register`           | Public           | Register a new customer                           |
| POST   | `/login/customer`     | Public           | Log in as CUSTOMER, returns access + refresh token |
| POST   | `/login/admin`        | Public           | Log in as ADMIN, returns access + refresh token    |
| POST   | `/refresh`             | Public (needs refresh token) | Exchange a refresh token for a new access token |
| POST   | `/admin`               | ADMIN only        | Create a new admin account (auto-generated password) |

**Register body:**
```json
{ "email": "customer@example.com", "password": "1234", "confirmPassword": "1234" }
```

**Login body:**
```json
{ "email": "customer@example.com", "password": "1234" }
```

**Login response:**
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": { "id": 1, "email": "customer@example.com", "role": "CUSTOMER" }
}
```

**Create admin (requires `Authorization: Bearer <admin access token>`):**
```json
{ "email": "newadmin@example.com" }
```
Response includes a `generatedPassword` — share it with the new admin securely; it is not stored in plaintext.

### Customer Forms (`/api/forms`)

| Method | Endpoint | Access        | Description                    |
|--------|----------|---------------|---------------------------------|
| POST   | `/`      | CUSTOMER only | Submit a new form               |

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Silva",
  "email": "john@example.com",
  "gender": "MALE",
  "mobileNumber": "0771234567",
  "address": "123 Main St, Colombo",
  "feedback": "optional"
}
```

### Admin Forms (`/api/admin/forms`)

| Method | Endpoint                          | Access     | Description                                  |
|--------|------------------------------------|------------|-----------------------------------------------|
| GET    | `/`                                 | ADMIN only | Get all submissions                            |
| GET    | `/?gender=MALE`                     | ADMIN only | Filter by gender (MALE, FEMALE, OTHER)         |
| GET    | `/?search=john`                     | ADMIN only | Case-insensitive partial search by first/last name |
| PUT    | `/:id`                              | ADMIN only | Update any field of a submission               |
| DELETE | `/:id`                              | ADMIN only | Delete a submission                            |

Query params `gender` and `search` can be combined.

All protected routes expect: `Authorization: Bearer <accessToken>`
