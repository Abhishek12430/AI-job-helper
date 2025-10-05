import { getAIResponse } from "../utils/aiAPI.js";

export const generateFeedback = async (req, res) => {
  const { prompt } = req.body;
  try {
    const feedback = await getAIResponse(prompt);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
};