import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../contex/AppContex";

const ResumeForm = () => {
  const { user } = useContext(AuthContext);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL; // ✅ Use env variable

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    skills: "",
    project1: "",
    project1Description: "",
    project2: "",
    project2Description: "",
    experience: "",
    passoutYear: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) return alert("Please login to analyze resume!");

    if (
      !formData.college ||
      !formData.branch ||
      !formData.skills ||
      !formData.project1 ||
      !formData.project2 ||
      !formData.passoutYear
    ) {
      return alert("Please fill all required fields!");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/resume/analyze`, // ✅ Use env variable
        formData
      );
      setResult(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 border rounded-xl shadow-md bg-white"
    >
      <h2 className="text-xl font-semibold mb-4">📄 Resume Builder & Analyzer</h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* Project 1 */}
        <input
          type="text"
          name="project1"
          placeholder="Project Link 1 (GitHub/Vercel/Netlify)"
          value={formData.project1}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="project1Description"
          placeholder="Project 1 Description"
          value={formData.project1Description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* Project 2 */}
        <input
          type="text"
          name="project2"
          placeholder="Project Link 2 (GitHub/Vercel/Netlify)"
          value={formData.project2}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="project2Description"
          placeholder="Project 2 Description"
          value={formData.project2Description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* Experience */}
        <textarea
          name="experience"
          placeholder="Work/Internship Experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* Passout */}
        <input
          type="text"
          name="passoutYear"
          placeholder="Passout Year"
          value={formData.passoutYear}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
      >
        {loading ? "Analyzing..." : "Submit Resume Info"}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-6 p-4 border-l-4 border-blue-600 bg-gray-50 rounded"
        >
          <p className="font-bold text-gray-700 mb-2">Resume Feedback:</p>
          <p className="text-gray-600 mb-2">{result.comment}</p>

          {result.mistakes?.length > 0 && (
            <div>
              <p className="font-semibold">Mistakes:</p>
              <ul className="list-disc ml-6 text-gray-600">
                {result.mistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {result.guidance?.length > 0 && (
            <div>
              <p className="font-semibold mt-2">Guidance:</p>
              <ul className="list-disc ml-6 text-gray-600">
                {result.guidance.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeForm;
