import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CodingRound from "../interview/CodingRound";
import TechnicalRound from "../interview/TechnicalRound";
import HRRound from "../interview/HRRound";


const InterviewPrep = () => {
  const [round, setRound] = useState(1);
  const [results, setResults] = useState({
    coding: null,
    technical: null,
    hr: null,
  });

  const navigate = useNavigate();

  const handleNextRound = (currentRoundResult) => {
    if (round === 1) setResults((prev) => ({ ...prev, coding: currentRoundResult }));
    if (round === 2) setResults((prev) => ({ ...prev, technical: currentRoundResult }));
    if (round === 3) setResults((prev) => ({ ...prev, hr: currentRoundResult }));

    if (!currentRoundResult.passed) {
      navigate("/feedback", {
        state: {
          failedRound: round === 1 ? "Coding" : round === 2 ? "Technical" : "HR",
          answer: currentRoundResult.answer,
        },
      });
      return;
    }

    setRound(round + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💼 Interview Preparation</h2>

      {round === 1 && <CodingRound onNext={handleNextRound} />}
      {round === 2 && results.coding?.passed && <TechnicalRound onNext={handleNextRound} />}
      {round === 3 && results.technical?.passed && <HRRound onNext={handleNextRound} />}

      {round > 3 && (
        <div className="text-green-600 font-bold text-lg">
          🎉 Congratulations! You cleared all rounds.
            <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/homepage/interviewPrep")} // ✅ absolute path
        ></button>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
