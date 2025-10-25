import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {API_BASE} from "../config";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { FaTools, FaClipboardCheck, FaUserTie } from "react-icons/fa";
import "./styles/BecomeWorker.css";

export default function BecomeWorker() {
  const { user } = useContext(UserContext);
  const [skills, setSkills] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [availability, setAvailability] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const isWorker = user?.worker_profile; // 👈 check if already a worker

  // Fetch all categories
  useEffect(() => {
    axios
      .get(`${API_BASE}/categories/`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setAllCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
        `${API_BASE}/become-worker/`,
        { skills, daily_rate: dailyRate, availability, categories },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to become a worker");
    } finally {
      setLoading(false);
    }
  };

  if (isWorker) {
    return (
      <motion.div
        className="already-worker"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaClipboardCheck className="worker-icon" />
        <h2>You're already registered as a worker!</h2>
        <p>Go to your dashboard to manage your services and bookings.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="go-dashboard-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to My Space
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="become-worker-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaUserTie className="title-icon" /> Become a Worker
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="worker-form"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <label>Skills:</label>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Describe your skills..."
          required
        />

        <label>Daily Rate (₹):</label>
        <input
          type="number"
          value={dailyRate}
          onChange={(e) => setDailyRate(e.target.value)}
          placeholder="Enter your daily rate"
          min="0"
          required
        />

        <label>Availability:</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value === "true")}
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <label>Categories:</label>
        <select
          multiple
          value={categories}
          onChange={(e) =>
            setCategories(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Become a Worker"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
