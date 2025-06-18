import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api", // adjust if different in production
});

export default instance;
