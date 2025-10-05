import openai from "../config/openai.js";

export const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Please provide a career goal!" });
    }

    // Prompt for AI to return numbered roadmap as JSON array
    const prompt = `Generate a step-by-step roadmap for someone who wants to become a ${goal}.
Return ONLY a JSON array of strings, each step as a string. 
Do NOT include markdown, bullet points, or any extra text.
Example format:
[
  "Step 1",
  "Step 2"
]`;

    // Call OpenAI / Gemini API
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash", // or "gpt-4.1"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const aiText = response.choices?.[0]?.message?.content || "";

    // Clean AI output and parse JSON
    let roadmapJSON;
    try {
      const cleaned = aiText.replace(/```json|```/g, "").trim();
      roadmapJSON = JSON.parse(cleaned);

      // Optional: Add numbering to each step
      roadmapJSON = roadmapJSON.map((step, idx) => `${idx + 1}. ${step}`);
    } catch (err) {
      console.error("Failed to parse AI response:", aiText);

      // Fallback roadmap
      roadmapJSON = [
        "1. Learn HTML, CSS, JavaScript",
        "2. Build small projects",
        "3. Practice MERN basics",
      ];
    }

    res.json({ roadmap: roadmapJSON });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating roadmap" });
  }
};
