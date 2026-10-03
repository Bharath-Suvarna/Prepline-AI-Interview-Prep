# Prepline — AI Interview Preparation Platform

Full-stack MERN AI interview preparation platform with automated code execution via AWS Lambda and Gemini/OpenAI evaluation.

## Features Included

- **JWT Authentication**: Real sign-up / sign-in with bcrypt password hashing and JWT token management (`POST /api/auth/register`, `POST /api/auth/login`).
- **Student Dashboard**: Live statistical summary (total interviews, average score, hours practiced, streak days) and recent activity stream (`GET /api/dashboard/summary`).
- **AI Mock Interviews**: Technical & HR interview turn-by-turn question generation and instant evaluation scoring (`POST /api/interview/start`, `POST /api/interview/:sessionId/question`, `POST /api/interview/:sessionId/answer`).
- **Sandboxed Code Execution**: Problem editor executing JavaScript code in a sandboxed isolate against test cases via AWS Lambda (`POST /api/code/run`, `GET /api/code/problems`).
- **Performance Analytics**: Time-series charts visualizing skill trends across Technical, HR, and Coding categories (`GET /api/performance`).

---

## Project Structure

```text
interview-prep-frontend/
├── backend/                  Express + MongoDB backend
│   ├── src/
│   │   ├── middleware/       JWT Auth Middleware
│   │   ├── models/           Mongoose Schemas (User, Question, InterviewSession, CodingProblem, CodeSubmission)
│   │   ├── routes/           Express Routes (auth, dashboard, interview, code, performance)
│   │   ├── services/         AI Service (Gemini/OpenAI + fallback) & Lambda Execution Service
│   │   ├── seed.js           Database seed script (coding problems & question bank)
│   │   └── server.js         Express Server Entrypoint
│   └── .env.example          Backend Environment variables template
├── lambda/
│   └── codeRunner/           AWS Lambda handler for sandboxed JS execution
└── src/                      React 19 Frontend
    ├── components/           Shared UI components
    ├── context/              AuthContext (wired to real /api/auth endpoints)
    ├── layouts/              App Layout Shell
    ├── pages/                AuthPage, Dashboard, MockInterview, CodeEditor, Performance
    └── services/             api.js (Axios) & mockData.js (wired to real backend endpoints)
```

---

## Setup & Local Development

### 1. MongoDB Setup
Ensure MongoDB is running locally on port `27017` or obtain a MongoDB Atlas connection URI.

```bash
# Example starting local mongodb (if installed via mongod)
mongod --dbpath /path/to/data
```

### 2. Configure Backend Environment
Navigate to the `backend/` directory, copy `.env.example` to `.env`, and update the variables:

```bash
cd backend
cp .env.example .env
```

**`backend/.env` contents:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prepline
JWT_SECRET=super_secret_prepline_jwt_key_2026
CORS_ORIGIN=http://localhost:5173
MOCK_AI=true                            # Set to false once GEMINI_API_KEY is provided
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
AWS_REGION=us-east-1
AWS_LAMBDA_CODE_RUNNER_ARN=            # Optional: ARN for deployed AWS Lambda function
```

### 3. Seed Database & Start Backend
Install backend dependencies, seed the initial database, and run the Express server:

```bash
cd backend
npm install
npm run seed      # Seeds Two Sum, Reverse String, Valid Palindrome & baseline questions
npm start         # Runs Express server at http://localhost:5000
```

### 4. Deploying AWS Lambda Handler (`lambda/codeRunner`)
To run code execution on AWS Lambda:

1. Create a Node.js 20.x Lambda function on AWS.
2. Package and upload `lambda/codeRunner/index.js` as the function handler (`index.handler`).
3. Set your backend's `AWS_LAMBDA_CODE_RUNNER_ARN` in `backend/.env` and ensure AWS credentials are set in the environment.
> *Note: If `AWS_LAMBDA_CODE_RUNNER_ARN` is not configured, the backend automatically uses its built-in local VM sandbox fallback runner.*

### 5. Configure & Start Frontend
In the root directory, create a `.env` file pointing `VITE_API_URL` to your backend:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite frontend development server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Tech Stack

- **Frontend**: React 19, Vite, React Router v7, Tailwind CSS v4, Lucide Icons, Recharts, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Services**: Google Gemini API (`@google/generative-ai`), AWS Lambda (`@aws-sdk/client-lambda`), Node `vm` Sandbox
