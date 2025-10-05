import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL; // environment variable

const HRRound = ({ onNext }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes timer (180 sec)

  // Fetch HR question from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/interview/hr-question`);
        setQuestion(res.data.question);
      } catch (err) {
        console.error("Error fetching HR question:", err);
      }
    };
    fetchQuestion();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) handleSubmit(); // auto-submit when time ends
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Submit answer
  const handleSubmit = async () => {
    if (!answer) return alert("Please answer the question!");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/interview/evaluate-hr`, {
        question,
        answer,
      });
      setFeedback(res.data);
      setLoading(false);

      // Move to next round if passed
      setTimeout(() => onNext(res.data), 1500);
    } catch (err) {
      console.error("Error submitting HR answer:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-4">
      <h3 className="font-semibold text-lg mb-2">🗣️ HR Round</h3>

      {/* Structured Question Display */}
      <pre className="mb-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
        {question}
      </pre>

      {/* Timer */}
      <p className="font-bold mb-2">
        Time Left: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? "0" : ""}
        {timeLeft % 60}
      </p>

      {/* Answer Input */}
      <textarea
        rows={5}
        className="w-full border p-2 rounded mb-4 font-mono"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
      />

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Checking..." : "Submit"}
      </button>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded ${
            feedback.passed ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p className="font-bold">
            {feedback.passed ? "✅ Good Answer!" : "❌ Try Again"}
          </p>
          <p>{feedback.comment}</p>
        </div>
      )}
    </div>
  );
};

export default HRRound;
