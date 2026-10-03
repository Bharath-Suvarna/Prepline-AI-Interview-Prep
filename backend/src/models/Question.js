import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  mode: { type: String, enum: ["technical", "hr"], required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  questionText: { type: String, required: true },
  source: { type: String, enum: ["ai", "seed"], default: "seed" }
});

export default mongoose.model("Question", questionSchema);
