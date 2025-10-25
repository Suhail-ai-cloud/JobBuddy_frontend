
// jobbuddy-frontend\src\pages\dashboard\WorkerAvailability.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import { API } from "../../api/api"; // import your axios instance
import "./styles/WorkerAvailability.css";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function WorkerAvailability() {
  const [availability, setAvailability] = useState({
    available_dates: [],
    booked_dates: [],
    blocked_dates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch availability
  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await API.get("/worker-profiles/me/availability/");
      setAvailability({
        available_dates: response.data.available_dates,
        booked_dates: response.data.booked_dates,
        blocked_dates: response.data.blocked_dates,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch availability.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Toggle date availability
  const handleDateClick = async (date) => {
    const dateStr = formatDate(date);
    const type = availability.blocked_dates.includes(dateStr) ? "available" : "blocked";

    try {
      await API.post("/worker-profiles/me/availability/", {
        dates: [dateStr],
        type,
      });
      fetchAvailability();
    } catch (err) {
      console.error(err);
      alert("Failed to update availability.");
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const d = formatDate(date);
      if (availability.booked_dates.includes(d)) return "booked";
      if (availability.blocked_dates.includes(d)) return "blocked";
      if (availability.available_dates.includes(d)) return "available";
    }
  };

  if (loading)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="loading">
        Loading availability...
      </motion.div>
    );

  if (error)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error">
        {error}
      </motion.div>
    );

  return (
    <motion.div
      className="worker-availability-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>📅 My Availability Calendar</h2>
      <p>Click a date to block/unblock</p>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />

      <div className="legend">
        <motion.div whileHover={{ scale: 1.1 }} className="available">
          <FiCheckCircle className="icon" /> Available
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="booked">
          <FiClock className="icon" /> Booked
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="blocked">
          <FiXCircle className="icon" /> Blocked
        </motion.div>
      </div>
    </motion.div>
  );
}
