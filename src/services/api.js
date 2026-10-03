import axios from "axios";

// Base URL for the future Express/MongoDB backend.
// Update VITE_API_URL in a .env file once the backend is deployed.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every request once auth is live.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("prepline_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
