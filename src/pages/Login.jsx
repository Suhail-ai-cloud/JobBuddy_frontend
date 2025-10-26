import React, { useState, useEffect } from "react";
import { login, googleLogin } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import axios from "axios";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import "./styles/Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);
    console.log("Window origin:", window.location.origin);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      const token = res.data.access;
      localStorage.setItem("access_token", token);

      // Set default authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const googleToken = res.credential;

      // Step 1: send Google token to backend
      const response = await googleLogin(googleToken);
      const userId = response.data.user_id;
      if (!userId) throw new Error("User ID missing");

      // Step 2: select role & get JWT
      const roleRes = await axios.post(`${API_BASE}/google-role-selection/`, {
        user_id: userId,
        role: role,
      });

      const accessToken = roleRes.data.access;
      localStorage.setItem("access_token", accessToken);

      // Step 3: set default header for all future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <motion.input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>
          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03, backgroundColor: "#004d40" }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>

        <div className="auth-divider">OR</div>

        <motion.div whileHover={{ scale: 1.02 }} className="google-login-btn">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google login failed")}
          />
        </motion.div>

        <p className="auth-footer">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
        <p className="auth-footer">
          Forgot password? <a href="/reset">Reset</a>
        </p>
      </motion.div>
    </div>
  );
}
