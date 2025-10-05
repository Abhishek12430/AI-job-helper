//frontend/src/pages/landingPages
import React from "react";
import { useNavigate } from "react-router-dom";

const LadingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-fade-in-down">
          🚀 AI-CareerCoach
        </h1>
        <p className="mt-4 text-lg max-w-xl animate-fade-in">
          Your personal AI guide for resume analysis, job preparation, and
          interview simulation.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce"
        >
          Let’s Start
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-800 py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 animate-slide-up">
          <h3 className="text-xl font-bold mb-3">📄 Resume Analyzer</h3>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            <li>Upload your resume</li>
            <li>AI gives score & feedback</li>
            <li>Improve with suggestions</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 animate-slide-up delay-200">
          <h3 className="text-xl font-bold mb-3">🎯 Job Preparation</h3>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            <li>Set your career goal</li>
            <li>Get a personalized roadmap</li>
            <li>Avoid common mistakes</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 animate-slide-up delay-500">
          <h3 className="text-xl font-bold mb-3">💼 Interview Prep</h3>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            <li>AI simulates real interview</li>
            <li>Rounds: Coding → Tech → HR</li>
            <li>Unlock next only if you pass</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LadingPage;
