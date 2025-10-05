//server/routes/aiRoutes.js
import express from "express";
import { generateFeedback } from "../controllers/aiController.js";

const router = express.Router();

router.post("/feedback", async (req, res) => {
  try {
    const { prompt } = req.body;
    const feedback = await generateFeedback(prompt);
    res.json({ feedback });
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
 