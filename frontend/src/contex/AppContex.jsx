import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/api/auth/login`, { email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/api/auth/register`, formData);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
