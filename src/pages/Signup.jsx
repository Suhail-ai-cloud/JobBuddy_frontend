import React, { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import "./styles/Auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful, please login");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Try again.");
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
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <motion.input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>
          <div className="input-group">
            <FiMail className="input-icon" />
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
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
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>

          <motion.select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="auth-select"
            whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
          >
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </motion.select>

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03, backgroundColor: "#004d40" }}
            whileTap={{ scale: 0.97 }}
          >
            Signup
          </motion.button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
