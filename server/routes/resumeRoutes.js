import express from "express";
import { analyzeResume } from "../controllers/resumeController.js";

const router = express.Router();

// Receive JSON data instead of file
router.post("/analyze", analyzeResume);

export default router;
