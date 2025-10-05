//server/models/InterviewResult
import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  round: { type: String, required: true },
  answer: { type: String, required: true },
  passed: { type: Boolean, required: true },
  feedback: { type: Object }
}, { timestamps: true });

export default mongoose.model("InterviewResult", interviewResultSchema);
