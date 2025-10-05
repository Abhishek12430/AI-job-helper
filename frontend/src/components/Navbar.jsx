import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contex/AppContex";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg animate-slideDown">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-white text-2xl font-bold tracking-wide animate-pulse">
          CareerAI
        </h1>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-white font-medium items-center">
          <li className="hover:scale-110 transition transform duration-300 cursor-pointer">
            <Link to="/homepage">Home</Link>
          </li>
          <li className="hover:scale-110 transition transform duration-300 cursor-pointer">
            <Link to="/profile">Profile</Link>
          </li>

          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
