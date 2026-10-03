import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true }
});

const codingProblemSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  prompt: { type: String, required: true },
  starter: { type: String, required: true },
  starters: {
    javascript: { type: String },
    python: { type: String },
    java: { type: String },
    cpp: { type: String }
  },
  testCases: [testCaseSchema]
});

export default mongoose.model("CodingProblem", codingProblemSchema);
