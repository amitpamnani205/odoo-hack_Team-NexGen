# GearGuard (Team NexGen)

GearGuard is a maintenance management system to track equipment, breakdown requests, preventive schedules, and technician workflow through a Kanban board and calendar.

## Team
- Amit Pamnani
- Aadam Husiany
- Ibrahim JP
- Meera Acharya

## Project Structure
- `backend/` Express + MongoDB API
- `frontend/` React + Vite UI

## Features
- Auth: signup/login with role support (admin/manager/technician/user)
- Maintenance teams and equipment categories
- Equipment master data with auto-assigned maintenance team
- Breakdown requests with Kanban workflow
- Preventive requests with calendar view
- Scrap flow auto-disables equipment

## Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` in `backend/`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/gearguard
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   API_PREFIX=/api/v1
   ```
3. Run:
   ```bash
   npm run dev
   ```

## Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. (Optional) Set API URL in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```
3. Run:
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5173`.

## Key API Endpoints
- Auth: `POST /api/v1/auth/signup`, `POST /api/v1/auth/login`
- Maintenance Teams: `POST /api/v1/maintenance-teams`, `POST /api/v1/maintenance-teams/:id/members`
- Equipment Categories: `POST /api/v1/equipment-categories`, `GET /api/v1/equipment-categories`
- Equipment: `POST /api/v1/equipment`, `GET /api/v1/equipment`
- Maintenance Requests: `POST /api/v1/maintenance-requests`, `GET /api/v1/maintenance-requests`

## Workflow Summary
Admin sets up teams and categories → equipment is created → breakdown/preventive requests are raised → work is tracked via Kanban → scrap automatically disables equipment → calendar shows planned maintenance.
