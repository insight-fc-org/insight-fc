# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2025-08-17
### Added
- **Monorepo scaffold** with pnpm + turbo workspaces.
- **API (NestJS + Prisma + MongoDB)**:
    - `Fixture` model (`apiId`, `timestamp`, `lineupStatus`) with indexes.
    - Seed script for deterministic data setup.
    - `GET /fixtures?status=upcoming&page&limit` endpoint.
    - Swagger (OpenAPI) documentation.
- **Web (Next.js)**:
    - `/fixtures` page listing upcoming matches.
    - Pagination and empty-state handling.
- **BDD (Cucumber + Pactum)**:
    - Living spec for “List upcoming fixtures”.
    - Test-only seed endpoint for reproducible acceptance tests.
- **CI/CD**:
    - GitHub Actions workflow for lint, typecheck, unit + BDD tests.
    - Cucumber report generation (local; CI artifact publishing next).
- **Developer Tooling**:
    - ESLint, Prettier, Zod for config validation.

---

## [Unreleased]
- Authentication & Authorization (JWT access + refresh).
- Admin controls for league toggling.
- Observability (structured logs, health checks).
- Hosted staging environment with preview deploys.