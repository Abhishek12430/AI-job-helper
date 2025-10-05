//frontend/src/pages/HomePages
import React from "react";
import { Outlet } from "react-router-dom"; // Add this
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <div className="flex h-screen animate-fadeIn">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 animate-slideIn">
        <Navbar />

        {/* Dynamic page content */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <Outlet /> {/* This is where the clicked page content will render */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
