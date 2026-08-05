# Vision Global Empowerment

This workspace is organized around three main parts:

- Frontend: [frontend/visions-platform](frontend/visions-platform)
- Backend: [backend/django-backend](backend/django-backend)
- Database reference: [database/VisionGlobalEmpowementFFG__](database/VisionGlobalEmpowementFFG__)

Shared code now lives under [shared](shared).

## Current status

- The frontend is a Vite + React app with its own package configuration.
- The backend is a Django project that exposes API endpoints.
- The database repo contains PostgreSQL schema definitions and setup notes for reference.

## Development

- Frontend: `pnpm --filter @vision-global-empowerment/visions-platform run dev`
- Backend: run the Django server from [backend/django-backend](backend/django-backend)
