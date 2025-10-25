import axios from "axios";
import API_BASE from "../config";

const API = axios.create({ baseURL: API_BASE });

// Normal login
export const login = async (email, password) => {
  return await API.post("/login/", { email, password });
};

export const signup = (data) => API.post("/signup/", data);

export const resetPassword = (data) =>
  API.post("/password-reset/", data); // NOT /auth/reset-password/


// Google login step 1: send token to backend
export const googleLogin = (token) =>
  API.post("/auth/google-login/", { token });
