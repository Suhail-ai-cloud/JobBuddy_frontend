import React, { useEffect, useState } from "react";
import { API, getWorkerBookings } from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/WorkerDashboard.css";

export default function WorkerDashboard() {
  const [dashboard, setDashboard] = useState({
    total_due_amount: 0,
    total_advance_paid: 0,
    total_balance_paid: 0,
    total_paid: 0,
    total_remaining: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/worker/dashboard/");
      setDashboard(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await getWorkerBookings();
      setBookings(data.results ?? data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setBookings([]);
    }
    setLoading(false);
  };

  const removeBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  useEffect(() => {
    fetchDashboard();
    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="wd-container">
      <h1 className="wd-title">Worker Dashboard</h1>

      {/* Totals Grid */}
      <div className="wd-totals-grid">
        {[
          { label: "Advance Paid", value: dashboard.total_advance_paid },
          { label: "Balance Paid", value: dashboard.total_balance_paid },
          { label: "Total Paid", value: dashboard.total_paid },
          { label: "Remaining", value: dashboard.total_remaining },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="wd-total-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h2>{card.label}</h2>
            <p>{card.value} INR</p>
          </motion.div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="wd-bookings-section">
        <h2>Bookings Details</h2>
        <div className="wd-table-wrapper">
          <table className="wd-payout-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Worker</th>
                <th>Advance Paid</th>
                <th>Balance</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
<tbody>
  <AnimatePresence>
    {bookings.length > 0 ? (
      bookings.map((b) => {
        const advancePaid = b.payments
          ?.filter((p) => p.status === "completed")
          .reduce((sum, p) => sum + Number(p.amount), 0) || 0;
        const totalAmount = Number(b.balance_amount || 0) + advancePaid;
        const remaining = totalAmount - advancePaid;

        return (
          <motion.tr
            key={b.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
          >
            <td data-label="ID">{b.id}</td>

            {/* User column */}
            <td data-label="User">
              {b.user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {b.user.profile_image && (
                    <img
                      src={b.user.profile_image}
                      alt={b.user.username}
                      style={{ width: 30, height: 30, borderRadius: "50%" }}
                    />
                  )}
                  {b.user.username}
                </div>
              ) : (
                "N/A"
              )}
            </td>

            {/* Worker column */}
            <td data-label="Worker">
              {b.worker ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {b.worker.profile_image && (
                    <img
                      src={b.worker.profile_image}
                      alt={b.worker.username}
                      style={{ width: 30, height: 30, borderRadius: "50%" }}
                    />
                  )}
                  {b.worker.username}
                </div>
              ) : (
                "N/A"
              )}
            </td>

            <td data-label="Advance Paid">{advancePaid} INR</td>
            <td data-label="Balance">{remaining} INR</td>
            <td data-label="Total Amount">{totalAmount} INR</td>

            <td
              data-label="Status"
              className={`wd-status ${
                b.status.toLowerCase() === "completed"
                  ? "completed"
                  : b.status.toLowerCase() === "rejected"
                  ? "rejected"
                  : "pending"
              }`}
            >
              {b.status}
            </td>

            <td data-label="Date">{b.date}</td>

            <td data-label="Action">
              <button
                className="wd-remove-btn"
                onClick={() => removeBooking(b.id)}
              >
                Remove
              </button>
            </td>
          </motion.tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="9" className="wd-no-bookings">
          No bookings available.
        </td>
      </tr>
    )}
  </AnimatePresence>
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
