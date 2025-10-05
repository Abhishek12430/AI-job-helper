//server/routes/interviewRoutes.js
import express from "express";
import {
  getCodingQuestion,
  evaluateCoding,
  getTechnicalQuestion,
  evaluateTechnical,
  getHRQuestion,
  evaluateHR,
  getFeedback
} from "../controllers/interviewController.js";

const router = express.Router();

router.get("/coding-question", getCodingQuestion);
router.post("/evaluate-coding", evaluateCoding);

router.get("/technical-question", getTechnicalQuestion);
router.post("/evaluate-technical", evaluateTechnical);

router.get("/hr-question", getHRQuestion);
router.post("/evaluate-hr", evaluateHR);

router.post("/feedback", getFeedback);

export default router;
