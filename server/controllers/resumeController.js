import openai from "../config/openai.js";

export const analyzeResume = async (req, res) => {
  try {
    const {
      name,
      college,
      branch,
      skills,
      project1,
      project1Description,
      project2,
      project2Description,
      experience,
      passoutYear,
    } = req.body;

    if (!college || !branch || !skills || !project1 || !project2 || !passoutYear) {
      return res.status(400).json({ message: "Please fill all required fields!" });
    }

    const prompt = `Analyze the following resume information and ONLY return a single JSON object (no markdown, no prose) with this structure:
{
  "score": number,
  "comment": "string",
  "mistakes": ["string", "string"],
  "guidance": ["string", "string"]
}
Resume Info:
Name: ${name || "N/A"}
College: ${college}
Branch: ${branch}
Skills: ${skills}

Project 1:
- Link: ${project1}
- Description: ${project1Description || "N/A"}

Project 2:
- Link: ${project2}
- Description: ${project2Description || "N/A"}

Experience: ${experience || "N/A"}
Passout Year: ${passoutYear}`;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash", // or "gpt-4.1" if using OpenAI
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const aiText = response.choices?.[0]?.message?.content || "";

    let aiResponseJSON;
    try {
      const cleaned = aiText.replace(/```json|```/g, "").trim();
      aiResponseJSON = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI response:", aiText);
      return res.status(500).json({ message: "AI returned an unparsable response. Try again." });
    }

    res.json(aiResponseJSON);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};
