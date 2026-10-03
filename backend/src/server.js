import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import { MongoMemoryServer } from "mongodb-memory-server";

// Fix Windows DNS SRV resolution for mongodb+srv://
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import interviewRoutes from "./routes/interview.js";
import codeRoutes from "./routes/code.js";
import performanceRoutes from "./routes/performance.js";
import { seedInitialData } from "./seedHelper.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({ origin: [CORS_ORIGIN, "http://localhost:5173"], credentials: true }));
app.use(express.json());

// Connect DB with fallback to MongoMemoryServer
async function connectDatabase() {
  const primaryUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prepline";
  try {
    await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 2500 });
    console.log(`Connected to MongoDB successfully at: ${primaryUri}`);
    await seedInitialData();
  } catch (err) {
    console.warn("Local MongoDB connection failed:", err.message);
    console.log("Starting automatic In-Memory MongoDB Server fallback...");
    try {
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log(`Connected to In-Memory MongoDB instance at: ${memoryUri}`);
      await seedInitialData();
    } catch (memErr) {
      console.error("Failed to start In-Memory MongoDB Server:", memErr.message);
    }
  }
}

connectDatabase();

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Prepline Backend", timestamp: new Date() });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/performance", performanceRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Prepline Backend listening on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
});
