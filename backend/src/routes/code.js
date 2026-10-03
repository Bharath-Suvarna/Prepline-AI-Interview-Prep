import express from "express";
import jwt from "jsonwebtoken";
import CodingProblem from "../models/CodingProblem.js";
import CodeSubmission from "../models/CodeSubmission.js";
import { runCodeOnLambda } from "../services/lambdaService.js";

const router = express.Router();

function getOptionalUserId(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      return decoded.userId;
    } catch (e) {
      return null;
    }
  }
  return null;
}

// GET /api/code/problems
router.get("/problems", async (req, res) => {
  try {
    const problems = await CodingProblem.find({}).sort({ customId: 1 });
    const mapped = problems.map((p) => ({
      id: p.customId,
      title: p.title,
      difficulty: p.difficulty,
      prompt: p.prompt,
      starter: p.starter,
      starters: p.starters || {
        javascript: p.starter,
        python: `# ${p.title}\n# Write your solution here`,
        java: `public class Solution {\n    // Write your solution here\n}`,
        cpp: `class Solution {\npublic:\n    // Write your solution here\n};`
      },
      testCases: p.testCases
    }));
    return res.json(mapped);
  } catch (err) {
    console.error("Get coding problems error:", err);
    return res.status(500).json({ error: "Failed to fetch coding problems." });
  }
});

// POST /api/code/run
router.post("/run", async (req, res) => {
  try {
    const { problemId, code, language = "javascript" } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required." });
    }

    let testCases = [];
    if (problemId) {
      const problem = await CodingProblem.findOne({ customId: problemId });
      if (problem && problem.testCases) {
        testCases = problem.testCases;
      }
    }

    const result = await runCodeOnLambda(code, testCases, language);

    const userId = getOptionalUserId(req);
    if (userId) {
      await CodeSubmission.create({
        userId,
        problemId: problemId || "custom",
        code,
        result,
        submittedAt: new Date()
      });
    }

    return res.json({
      passed: result.passed,
      output: result.output,
      testsPassed: result.testsPassed,
      testsTotal: result.testsTotal
    });
  } catch (err) {
    console.error("Run code error:", err);
    return res.status(500).json({ error: "Failed to run code." });
  }
});

export default router;
