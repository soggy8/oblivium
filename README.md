# Oblivium Atelier

Premium black-and-gold landing page for a marketing atelier, with a Next.js frontend and a Python FastAPI backend for lead capture.

## Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion
- Backend: FastAPI, SQLAlchemy, PostgreSQL, Alembic-ready migrations
- Local database: PostgreSQL via Docker Compose

## Local Setup

### 1. Start PostgreSQL

```bash
docker compose up -d postgres
```

### 2. Backend

```bash
cd backend
cp .env.example .env
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Health check: `GET /health`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Lead Endpoint

The contact form posts to:

```http
POST /api/leads
```

Payload:

```json
{
  "name": "Avery Stone",
  "email": "avery@example.com",
  "company": "Stone House",
  "budget": "$15k - $50k",
  "goals": "Reposition the brand and build a premium campaign landing page."
}
```

## Environment

Frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Backend:

```bash
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/oblivium
FRONTEND_ORIGIN=http://localhost:3000
CREATE_TABLES_ON_STARTUP=true
```

`CREATE_TABLES_ON_STARTUP=true` is convenient for local development. For production, set it to `false` and run migrations with Alembic.

## Migrations

Create an initial migration after the database is running:

```bash
cd backend
alembic revision --autogenerate -m "create leads table"
alembic upgrade head
```
