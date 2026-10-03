import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import InterviewSession from "../models/InterviewSession.js";
import CodeSubmission from "../models/CodeSubmission.js";

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const interviewSessions = await InterviewSession.find({ userId }).sort({ startedAt: -1 });
    const codeSubmissions = await CodeSubmission.find({ userId }).sort({ submittedAt: -1 });

    const totalInterviews = interviewSessions.length;

    // Calculate average score across interview sessions
    let avgScore = 0;
    if (interviewSessions.length > 0) {
      const sum = interviewSessions.reduce((acc, s) => acc + (s.overallScore || 0), 0);
      avgScore = Math.round(sum / interviewSessions.length);
    } else {
      avgScore = 0;
    }

    // Estimate hours practiced: ~20 mins per interview + ~15 mins per coding submission
    const totalMinutes = interviewSessions.length * 20 + codeSubmissions.length * 15;
    const hoursPracticed = Number((totalMinutes / 60).toFixed(1));

    // Calculate streak days (consecutive dates with activity)
    const activeDates = new Set();
    interviewSessions.forEach((s) => activeDates.add(new Date(s.startedAt).toISOString().split("T")[0]));
    codeSubmissions.forEach((c) => activeDates.add(new Date(c.submittedAt).toISOString().split("T")[0]));

    const sortedDates = Array.from(activeDates).sort().reverse();
    let streakDays = 0;

    if (sortedDates.length > 0) {
      let current = new Date();
      current.setHours(0, 0, 0, 0);

      // Check if today or yesterday has activity
      const todayStr = current.toISOString().split("T")[0];
      const yesterday = new Date(current);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (sortedDates.includes(todayStr) || sortedDates.includes(yesterdayStr)) {
        let checkDate = sortedDates.includes(todayStr) ? current : yesterday;
        while (true) {
          const dateStr = checkDate.toISOString().split("T")[0];
          if (sortedDates.includes(dateStr)) {
            streakDays++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    // Build recent sessions array (last 4 combined sessions)
    const combinedSessions = [];

    interviewSessions.forEach((s) => {
      const dateStr = new Date(s.startedAt).toISOString().split("T")[0];
      const firstQ = s.questions?.[0];
      combinedSessions.push({
        id: s._id.toString(),
        type: s.mode === "hr" ? "HR" : "Technical",
        topic: firstQ?.questionText ? (s.mode === "hr" ? "Behavioral" : "Technical Q&A") : (s.mode === "hr" ? "Behavioral" : "System Design"),
        date: dateStr,
        score: s.overallScore || 75,
        timestamp: new Date(s.startedAt).getTime()
      });
    });

    codeSubmissions.forEach((c) => {
      const dateStr = new Date(c.submittedAt).toISOString().split("T")[0];
      combinedSessions.push({
        id: c._id.toString(),
        type: "Coding",
        topic: c.problemId ? `Problem ${c.problemId}` : "Arrays",
        date: dateStr,
        score: c.result?.passed ? 90 : 50,
        timestamp: new Date(c.submittedAt).getTime()
      });
    });

    combinedSessions.sort((a, b) => b.timestamp - a.timestamp);
    const recentSessions = combinedSessions.slice(0, 4).map(({ id, type, topic, date, score }) => ({
      id,
      type,
      topic,
      date,
      score
    }));

    return res.json({
      totalInterviews,
      avgScore,
      hoursPracticed,
      streakDays,
      recentSessions
    });
  } catch (err) {
    console.error("Dashboard Summary Error:", err);
    return res.status(500).json({ error: "Failed to fetch dashboard summary." });
  }
});

export default router;
