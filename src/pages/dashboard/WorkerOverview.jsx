
// jobbuddy-frontend\src\pages\dashboard\WorkerOverview.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MEDIA_BASE } from "../../api/api"; 
import { API } from "../../api/api"; // use centralized API instance
import "./styles/WorkerOverview.css";

export default function WorkerOverview() {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolveImage = (url) => {
  if (!url) return "https://via.placeholder.com/150";
  // Prepend MEDIA_BASE for relative paths
  return url.startsWith("http") ? url : `${MEDIA_BASE}${url}`;
};

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await API.get("/users/me/"); // centralized API
        const data = response.data;
        setWorker(data.worker_profile ? { ...data.worker_profile, ...data } : data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, []);

  if (loading) return <p className="loading-text">Loading overview...</p>;
  if (!worker) return <p className="loading-text">Worker not found.</p>;

  return (
    <div className="overview-page">
      {/* Profile Header */}
      <header className="overview-header">
        <motion.img
          src={resolveImage(worker.profile_image)}
          alt="Profile"
          className="overview-profile-img"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="overview-header-info">
          <h2>{worker.first_name} {worker.last_name}</h2>
          <p className="overview-email">{worker.email}</p>
          <p className="overview-phone">{worker.phone}</p>
          <p className="overview-location">{worker.location || "Location not set"}</p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="overview-cards">
        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Skills</h3>
          <p>{worker.skills || "Not set"}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Daily Rate</h3>
          <p>₹{worker.daily_rate || 0}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Availability</h3>
          <p>{worker.availability ? "Available" : "Not Available"}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Verified</h3>
          <p>{worker.verified ? "Yes" : "No"}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Categories</h3>
          <p>{worker.categories?.join(", ") || "None"}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Total Jobs</h3>
          <p>{worker.total_jobs || 0}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Advance Amount</h3>
          <p>₹{worker.advance_amount || 0}</p>
        </motion.div>

        <motion.div className="overview-card" whileHover={{ scale: 1.03 }}>
          <h3>Average Rating</h3>
          <p>{worker.average_rating?.toFixed(1) || 0} ⭐</p>
        </motion.div>
      </section>
    </div>
  );
}
