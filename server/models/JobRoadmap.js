//sever/models/jobRoadmap.js
import mongoose from "mongoose";

const jobRoadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: { type: String, required: true },
  roadmap: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("JobRoadmap", jobRoadmapSchema);
