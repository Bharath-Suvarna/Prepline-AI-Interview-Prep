import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import InterviewSession from "../models/InterviewSession.js";
import CodeSubmission from "../models/CodeSubmission.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const interviewSessions = await InterviewSession.find({ userId }).sort({ startedAt: 1 });
    const codeSubmissions = await CodeSubmission.find({ userId }).sort({ submittedAt: 1 });

    const grouped = {};

    function getFormattedDate(dateObj) {
      const d = new Date(dateObj);
      return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    }

    interviewSessions.forEach((s) => {
      const dateKey = getFormattedDate(s.startedAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = { session: dateKey, technical: null, hr: null, coding: null, timestamp: new Date(s.startedAt).getTime() };
      }
      const score = s.overallScore || 70;
      if (s.mode === "hr") {
        grouped[dateKey].hr = score;
      } else {
        grouped[dateKey].technical = score;
      }
    });

    codeSubmissions.forEach((c) => {
      const dateKey = getFormattedDate(c.submittedAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = { session: dateKey, technical: null, hr: null, coding: null, timestamp: new Date(c.submittedAt).getTime() };
      }
      const score = c.result?.passed ? (c.result.testsPassed / c.result.testsTotal) * 100 : 40;
      grouped[dateKey].coding = Math.round(score);
    });

    const result = Object.values(grouped)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ session, technical, hr, coding }) => ({
        session,
        technical: technical ?? 60,
        hr: hr ?? 65,
        coding: coding ?? 50
      }));

    if (result.length === 0) {
      // Return default baseline trend array if no user sessions exist yet
      return res.json([
        { session: "Aug 20", technical: 55, hr: 60, coding: 50 },
        { session: "Aug 24", technical: 62, hr: 65, coding: 58 },
        { session: "Aug 28", technical: 58, hr: 70, coding: 66 },
        { session: "Sep 01", technical: 70, hr: 68, coding: 74 },
        { session: "Sep 04", technical: 75, hr: 72, coding: 80 },
        { session: "Sep 06", technical: 82, hr: 78, coding: 88 }
      ]);
    }

    return res.json(result);
  } catch (err) {
    console.error("Performance error:", err);
    return res.status(500).json({ error: "Failed to fetch performance history." });
  }
});

export default router;
