import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import "./styles/Auth.css";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await API.post(`/password-reset-confirm/${uid}/${token}/`, {
        new_password: newPassword,
      });
      alert("Password reset successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Reset failed. Try again.");
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
            <FiLock className="input-icon" />
            <motion.input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <motion.input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              whileFocus={{ scale: 1.02, borderColor: "#00796b" }}
            />
          </div>

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03, backgroundColor: "#004d40" }}
            whileTap={{ scale: 0.97 }}
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
