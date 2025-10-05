import openai from "../config/openai.js";

// Generate DSA-only question for coding round
const getDSACodingQuestion = async () => {
  const prompt = `
  Generate a **DSA coding problem** suitable for any programming language.
  - Provide only the question text.
  - Include examples if necessary.
  - Do NOT provide the solution.
  `;
  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices?.[0]?.message?.content || "No question available.";
  } catch (err) {
    console.error("AI DSA question error:", err);
    return "Failed to fetch DSA question from AI.";
  }
};

const getAIResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant for interview evaluation." },
        { role: "user", content: prompt },
      ],
    });
    return response.choices?.[0]?.message?.content || "No feedback available.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "AI service error.";
  }
};

// Coding round: only DSA questions
export const getCodingQuestion = async (req, res) => {
  const question = await getDSACodingQuestion();
  res.json({ question });
};

export const evaluateCoding = async (req, res) => {
  const { question, answer } = req.body;
  const comment = await getAIResponse(`Evaluate this coding answer: ${answer} for DSA question: ${question}. Check correctness, efficiency, and edge cases.`);
  const passed = answer.length > 5; // simple logic; can improve with real evaluation
  res.json({ passed, comment, answer });
};

// Technical round (non-DSA)
export const getTechnicalQuestion = async (req, res) => {
  const question = await getAIResponse("Generate a general technical interview question.");
  res.json({ question });
};

export const evaluateTechnical = async (req, res) => {
  const { question, answer } = req.body;
  const comment = await getAIResponse(`Evaluate this technical answer: ${answer} for question: ${question}`);
  const passed = answer.length > 5;
  res.json({ passed, comment, answer });
};

// HR round
export const getHRQuestion = async (req, res) => {
  const question = await getAIResponse("Generate an HR interview question.");
  res.json({ question });
};

export const evaluateHR = async (req, res) => {
  const { question, answer } = req.body;
  const comment = await getAIResponse(`Evaluate this HR answer: ${answer} for question: ${question}`);
  const passed = answer.length > 5;
  res.json({ passed, comment, answer });
};

export const getFeedback = async (req, res) => {
  const { failedRound, answer } = req.body;
  const comment = await getAIResponse(`Give feedback for failed ${failedRound} answer: ${answer}`);
  res.json({ comment });
};
