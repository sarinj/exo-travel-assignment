# EXO Travel Assignment

Customer management demo app with:

- Frontend: Next.js (App Router)
- Backend: NestJS + TypeORM + SQLite

## Prerequisites

- Node.js 20+
- pnpm 9+

Check versions:

```bash
node -v
pnpm -v
```

## Project Structure

```text
.
|- frontend/   # Next.js app
|- backend/    # NestJS API
```

## Install Dependencies

Install dependencies for both apps:

```bash
pnpm --dir backend install
pnpm --dir frontend install
```

## Run Services Separately

Backend:

```bash
pnpm --dir backend start:dev
```

Frontend:

```bash
pnpm --dir frontend dev
```

This starts:

- Backend on http://localhost:3001
- Frontend on http://localhost:3000

## Open the App

- Frontend: http://localhost:3000
- API docs (Swagger): http://localhost:3001/api/docs

## Login

The login endpoint is mocked, so any email/password works.

## Notes

- mocked customer data will be generated on backend startup
