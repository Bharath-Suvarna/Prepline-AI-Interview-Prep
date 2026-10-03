import mongoose from "mongoose";

const sessionQuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  answerText: { type: String },
  score: { type: Number },
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  summary: { type: String }
});

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mode: { type: String, enum: ["technical", "hr"], required: true },
  questions: [sessionQuestionSchema],
  overallScore: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

export default mongoose.model("InterviewSession", interviewSessionSchema);
