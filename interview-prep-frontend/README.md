# Prepline — AI Interview Preparation Platform (Frontend)

Frontend-only build for the MERN-stack AI interview preparation platform.
Built with React + Vite + Tailwind. The backend (Express/MongoDB + Gemini/OpenAI)
is not wired up yet — all data currently comes from a mock service layer designed
to be swapped for real API calls with minimal changes.

## Features included

- JWT-style login/register flow (`AuthContext`, mocked for now — see below)
- Protected routes / student dashboard with stats and recent sessions
- AI-generated technical & HR questions (mocked question bank + generator)
- Text-based mock interview chat with simulated AI feedback per answer
- Code editor page with sample DSA problems and a mock "run code" flow
- Performance chart (Recharts) tracking score trends across sessions

## Getting started in VS Code

1. Open this folder (`interview-prep-frontend`) in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL (usually `http://localhost:5173`).
5. Log in with any name/email/password — auth is mocked client-side for now.

## Project structure

```
src/
  components/     Shared UI pieces (PageHeader, ProtectedRoute)
  context/        AuthContext (login/register/logout, mocked JWT)
  layouts/        AppLayout (sidebar + top bar shell for logged-in pages)
  pages/          AuthPage, Dashboard, MockInterview, CodeEditor, Performance
  services/
    api.js        Preconfigured axios instance, points at VITE_API_URL
    mockData.js   Mock question bank + fake AI evaluation/feedback logic
```

## Connecting the real backend later

`src/services/api.js` already reads `VITE_API_URL` from a `.env` file
(see `.env.example`) and attaches the JWT from `localStorage` to every request.
Once the Express backend is ready:

1. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.
2. In `AuthContext.jsx`, replace the mock `login`/`register` bodies with calls to
   `POST /api/auth/login` and `POST /api/auth/register` using `api` from `services/api.js`.
3. In `services/mockData.js`, replace each function body with the matching
   `api.get(...)` / `api.post(...)` call to your Express routes
   (`/dashboard/summary`, `/performance`, `/interview/question`,
   `/interview/evaluate`, `/code/run`). The function names and return shapes
   are already what the pages expect, so no component code needs to change.

## Tech stack

React 19 · React Router · Tailwind CSS v4 · Recharts · Lucide icons · Axios
