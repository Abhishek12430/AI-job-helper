import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "AIzaSyDZXvw3bXvjL6HFvlfwBtL1Bau69vnEulg", // ✅ must be a string
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;
