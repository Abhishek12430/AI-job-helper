import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Briefcase, FileText, Target, Home } from "lucide-react";
import { AuthContext } from "../contex/AppContex";
const SideBar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="w-64 h-screen bg-[#605CFF] text-white shadow-xl flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-4 border-white/20">
        <h1 className="text-xl font-bold">CareerAI</h1>
        <p className="text-sm text-gray-200">AI Career Coach</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-[#605CFF] shadow-md"
                : "hover:bg-[#7A77FF] hover:text-white"
            }`
          }
        >
          <Home size={18} /> Home
        </NavLink>

        <NavLink
          to="/homepage/resumeanalyzer"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-[#605CFF] shadow-md"
                : "hover:bg-[#7A77FF] hover:text-white"
            }`
          }
        >
          <FileText size={18} /> Resume Analyzer
        </NavLink>

        <NavLink
          to="/homepage/jobPreparation"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-[#605CFF] shadow-md"
                : "hover:bg-[#7A77FF] hover:text-white"
            }`
          }
        >
          <Target size={18} /> Job Preparation
        </NavLink>

        <NavLink
          to="/homepage/interviewPrep"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-[#605CFF] shadow-md"
                : "hover:bg-[#7A77FF] hover:text-white"
            }`
          }
        >
          <Briefcase size={18} /> Interview Prep
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="px-6 py-4 border-t border-white/20 text-xs text-gray-200">
        <button
          onClick={logout}
          className="w-full py-2 mt-2 bg-red-500 hover:bg-red-600 rounded text-white font-medium"
        >
          Logout
        </button>
        <p className="mt-2 text-center">© 2025 CareerAI</p>
      </div>
    </div>
  );
};

export default SideBar;
