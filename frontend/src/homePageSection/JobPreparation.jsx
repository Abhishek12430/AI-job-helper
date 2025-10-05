import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Markdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const JobPreparation = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL; // ✅ Use env variable

  const [goal, setGoal] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Highlight code snippets whenever messages change
  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  // Convert AI array response into a numbered Markdown list
  const formatAIResponse = (aiData) => {
    if (!aiData) return "";
    if (Array.isArray(aiData)) {
      return aiData
        .map((item, idx) => `${idx + 1}. ${item.trim()}`)
        .join("\n");
    }
    return aiData.toString();
  };

  const handleGenerate = async () => {
    if (!goal) return alert("Please enter your career goal!");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: goal, timestamp: Date.now(), isImage: false },
    ]);

    try {
      const res = await axios.post(`${SERVER_URL}/api/job/roadmap`, { goal }); // ✅ use env
      const formatted = formatAIResponse(res.data.roadmap);

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: formatted, timestamp: Date.now(), isImage: false },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "1. Learn HTML, CSS, JavaScript\n2. Build small projects\n3. Practice MERN basics",
          timestamp: Date.now(),
          isImage: false,
        },
      ]);
    }

    setLoading(false);
  };

  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-lg font-semibold my-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-md font-medium my-1" {...props} />,
    p: ({ node, ...props }) => <p className="text-sm my-1" {...props} />,
    li: ({ node, ...props }) => <li className="ml-4 list-disc text-sm my-1" {...props} />,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <pre className="my-2 rounded-md overflow-x-auto bg-gray-900 p-2">
          <code className={className} {...props}>{children}</code>
        </pre>
      ) : (
        <code className="bg-gray-200 rounded px-1 py-0.5" {...props}>{children}</code>
      );
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 border rounded-xl shadow-md bg-white max-w-full w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">🎯 Job Preparation</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4 w-full">
        <input
          type="text"
          placeholder="Enter your career goal (e.g., MERN Developer)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="flex-1 border p-2 rounded w-full"
        />
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      <div className="flex flex-col w-full">
        {messages.map((message, idx) => (
          <div key={idx} className="my-2 w-full">
            {message.role === "user" ? (
              <div className="flex items-start justify-end gap-2 w-full">
                <div className="flex flex-col gap-1 p-2 px-4 bg-slate-50 border rounded-md max-w-full">
                  <p className="text-sm text-black">{message.content}</p>
                  <span className="text-xs text-black/60">{new Date(message.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-2 px-4 max-w-full bg-primary/20 border rounded-md w-full">
                {message.isImage ? (
                  <img src={message.content} alt="ai" className="w-full max-w-full mt-2 rounded-md" />
                ) : (
                  <div className="text-sm w-full">
                    <Markdown components={markdownComponents}>{message.content}</Markdown>
                  </div>
                )}
                <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobPreparation;
