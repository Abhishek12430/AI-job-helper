import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AuthProvider, { AuthContext } from "./contex/AuthContext";
import {AuthProvider,AuthContext} from "./contex/AppContex";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
// import Profile from "./pages/Profile";
import Profile from "./components/Profile";
// import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ResumeAnalyzer from "./homePageSection/ResumeAnalyzer";
import JobPreparation from "./homePageSection/JobPreparation";
import InterviewPrep from "./homePageSection/InterviewPrep";
import FeedbackPage from "./pages/FeedbackPage";
import LandingPage from "./pages/LadingPage"

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          >
            <Route path="resumeanalyzer" element={<ResumeAnalyzer />} />
            <Route path="jobPreparation" element={<JobPreparation />} />
            <Route path="interviewPrep" element={<InterviewPrep />} />
          </Route>

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
