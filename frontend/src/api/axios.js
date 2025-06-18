import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "", // adjust if different in production
});

export default instance;
