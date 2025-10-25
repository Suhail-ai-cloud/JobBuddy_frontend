import React, { useState } from "react";
import { resetPassword } from "../api/auth";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import "./styles/Auth.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email });
      alert("Reset link sent to your email");
    } catch {
      alert("Reset failed. Please try again.");
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
        <h2 className="auth-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>
          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03, backgroundColor: "#004d40" }}
            whileTap={{ scale: 0.97 }}
          >
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
