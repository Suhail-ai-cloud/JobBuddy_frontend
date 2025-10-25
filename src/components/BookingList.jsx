import React, { useState } from "react";
import { motion } from "framer-motion";
import { API } from "../api/api";
import { FiMapPin, FiFileText, FiInfo } from "react-icons/fi";
import "./styles/BookingList.css";

export default function BookingList({ bookings, setBookings, readOnly = false }) {
  const [loadingId, setLoadingId] = useState(null);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This cannot be undone.")) return;
    setLoadingId(bookingId);
    try {
      await API.post(`/bookings/${bookingId}/reject/`);
      setBookings((prev) =>
        prev.map(b => b.id === bookingId ? { ...b, status: "rejected" } : b)
      );
      alert("Booking canceled and payment refunded.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking.");
    } finally {
      setLoadingId(null);
    }
  };

  const resolveStatusColor = (status) => {
    switch (status) {
      case "pending": return "badge-pending";
      case "accepted": return "badge-accepted";
      case "completed": return "badge-completed";
      case "rejected": return "badge-rejected";
      default: return "badge-pending";
    }
  };

  if (!bookings.length) return <p className="no-bookings">No bookings found.</p>;

  return (
    <div className="bookings-grid">
      {bookings.map((b) => {
        const advancePaid = b.payments?.filter(p => p.status === "completed")
          .reduce((sum, p) => sum + Number(p.amount), 0) || 0;
        const totalAmount = Number(b.balance_amount || 0) + advancePaid;

        return (
          <motion.div
            key={b.id}
            className="booking-card"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="booking-header">
              <h3>{b.user}</h3>
              <span className={`status-badge ${resolveStatusColor(b.status)}`}>{b.status}</span>
            </div>
            <p><FiMapPin /> <strong>Location:</strong> {b.location || "Not provided"}</p>
            {b.description && <p><FiFileText /> <strong>Description:</strong> {b.description}</p>}
            {b.notes && <p><FiInfo /> <strong>Notes:</strong> {b.notes}</p>}
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Advance Paid:</strong> {advancePaid} INR</p>
            <p><strong>Total Amount:</strong> {totalAmount} INR</p>

            {!readOnly && (b.status === "pending" || b.status === "accepted") && (
              <button className="cancel-btn" onClick={() => cancelBooking(b.id)}>
                {loadingId === b.id ? <div className="small-spinner"></div> : "Cancel Booking"}
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
