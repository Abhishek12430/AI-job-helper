import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contex/AppContex";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        No user logged in 🚫
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar || "https://avatar.iran.liara.run/public/45"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-indigo-600 font-medium">
            🎯 Goal: {user.careerGoal || "Not set yet"}
          </p>
        </div>
      </div>

      {/* Bio / About Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
        <p className="text-gray-600 leading-relaxed">
          Hi, I’m {user.name}! I’m passionate about becoming a{" "}
          <span className="font-semibold">
            {user.careerGoal || "your dream role"}
          </span>{" "}
          and currently working on improving my skills in web development,
          problem solving, and AI-powered career tools.
        </p>
      </div>

      {/* Future Edit Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          onClick={() => alert("Profile editing feature coming soon! 🚀")}
        >
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
