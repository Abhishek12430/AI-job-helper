import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { failedRound } = location.state || {};

  useEffect(() => {
    if (!failedRound) return;

    // Auto-redirect to InterviewPrep after 5 seconds
    const timer = setTimeout(() => {
      navigate("/homepage/interviewPrep"); // ✅ absolute path
    }, 5000);
    return () => clearTimeout(timer);
  }, [failedRound, navigate]);

  if (!failedRound) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">No failed round info available.</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/homepage/interviewPrep")} // ✅ absolute path
        >
          Go Back to Interview Prep
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        ⚠️ You did not pass the {failedRound} Round
      </h2>

      <p className="mb-4">Don't worry! You can try the interview again.</p>

      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => navigate("/homepage/interviewPrep")} // ✅ absolute path
      >
        Retry Interview
      </button>
    </div>
  );
};

export default FeedbackPage;
