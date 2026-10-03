import mongoose from "mongoose";

const codeSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: String, required: true },
  code: { type: String, required: true },
  result: {
    passed: { type: Boolean, required: true },
    output: { type: String },
    testsPassed: { type: Number, required: true },
    testsTotal: { type: Number, required: true }
  },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("CodeSubmission", codeSubmissionSchema);
