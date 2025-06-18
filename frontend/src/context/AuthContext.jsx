import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js"
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const login = async (credentials) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ save user
      localStorage.setItem("token", res.data.token);           // ✅ save token
      toast.success("Login successful");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post("/users/register", userData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ save user
      localStorage.setItem("token", res.data.token);           // ✅ save token
      toast.success("Registration successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
