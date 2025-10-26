import axios from "axios";
import { API_BASE } from "../config";

const API = axios.create({ baseURL: API_BASE });

// Automatically attach JWT token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Normal login
export const login = (email, password) => API.post("/login/", { email, password });

// Signup
export const signup = (data) => API.post("/signup/", data);

// Password reset
export const resetPassword = (data) => API.post("/password-reset/", data);

// Google login: send credential token to backend
export const googleLogin = (token) => API.post("/auth/google-login/", { token });
