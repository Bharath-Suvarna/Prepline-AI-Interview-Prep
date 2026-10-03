import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import InterviewSession from "../models/InterviewSession.js";
import { generateQuestion, evaluateAnswer } from "../services/aiService.js";

const router = express.Router();

// Standalone endpoint: POST /api/interview/question
router.post("/question", async (req, res) => {
  try {
    const { mode = "technical", askedIds = [] } = req.body;
    const question = await generateQuestion(mode, askedIds);
    return res.json(question);
  } catch (err) {
    console.error("Generate question error:", err);
    return res.status(500).json({ error: "Failed to generate question." });
  }
});

// Standalone endpoint: POST /api/interview/evaluate
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!answer) {
      return res.status(400).json({ error: "Answer is required." });
    }
    const feedback = await evaluateAnswer(question, answer);
    return res.json(feedback);
  } catch (err) {
    console.error("Evaluate answer error:", err);
    return res.status(500).json({ error: "Failed to evaluate answer." });
  }
});

// Session flow: POST /api/interview/start
router.post("/start", authMiddleware, async (req, res) => {
  try {
    const { mode = "technical" } = req.body;
    const userId = req.user.userId;

    const question = await generateQuestion(mode, []);

    const session = await InterviewSession.create({
      userId,
      mode,
      questions: [
        {
          questionId: question.id,
          questionText: question.question
        }
      ],
      startedAt: new Date()
    });

    return res.status(201).json({
      sessionId: session._id.toString(),
      question
    });
  } catch (err) {
    console.error("Start interview error:", err);
    return res.status(500).json({ error: "Failed to start interview session." });
  }
});

// Session flow: POST /api/interview/:sessionId/question
router.post("/:sessionId/question", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { askedIds = [] } = req.body;

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Interview session not found." });
    }

    const question = await generateQuestion(session.mode, askedIds);
    session.questions.push({
      questionId: question.id,
      questionText: question.question
    });
    await session.save();

    return res.json({ id: question.id, topic: question.topic, difficulty: question.difficulty, question: question.question });
  } catch (err) {
    console.error("Next question error:", err);
    return res.status(500).json({ error: "Failed to fetch next question." });
  }
});

// Session flow: POST /api/interview/:sessionId/answer
router.post("/:sessionId/answer", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, question, answer } = req.body;

    if (!answer) {
      return res.status(400).json({ error: "Answer is required." });
    }

    const session = await InterviewSession.findById(sessionId);
    const feedback = await evaluateAnswer(question || "Interview question", answer);

    if (session) {
      const qEntry = session.questions.find((q) => q.questionId === questionId) || session.questions[session.questions.length - 1];
      if (qEntry) {
        qEntry.answerText = answer;
        qEntry.score = feedback.score;
        qEntry.strengths = feedback.strengths;
        qEntry.improvements = feedback.improvements;
        qEntry.summary = feedback.summary;
      } else {
        session.questions.push({
          questionId: questionId || `q_${Date.now()}`,
          questionText: typeof question === "string" ? question : question?.question || "Question",
          answerText: answer,
          score: feedback.score,
          strengths: feedback.strengths,
          improvements: feedback.improvements,
          summary: feedback.summary
        });
      }
      await session.save();
    }

    return res.json({
      score: feedback.score,
      strengths: feedback.strengths,
      improvements: feedback.improvements,
      summary: feedback.summary
    });
  } catch (err) {
    console.error("Submit answer error:", err);
    return res.status(500).json({ error: "Failed to evaluate answer." });
  }
});

// Session flow: POST /api/interview/:sessionId/complete
router.post("/:sessionId/complete", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    const scoredQuestions = session.questions.filter((q) => typeof q.score === "number");
    const totalScore = scoredQuestions.reduce((sum, q) => sum + q.score, 0);
    session.overallScore = scoredQuestions.length ? Math.round(totalScore / scoredQuestions.length) : 0;
    session.completedAt = new Date();
    await session.save();

    return res.json(session);
  } catch (err) {
    console.error("Complete session error:", err);
    return res.status(500).json({ error: "Failed to complete interview session." });
  }
});

export default router;
