
import React, { useEffect, useState } from "react";
import { getUserBookings, payBooking, confirmPayment } from "../api/payment";
import { FiCheckCircle, FiClock, FiUser, FiXCircle, FiCreditCard, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/PayBookings.css";
import { API } from "../api/api";
// make sure your axios instance is imported

export default function PayBookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  // For no-show modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingBooking, setReportingBooking] = useState(null);
  const [reportFiles, setReportFiles] = useState([]);
  const [reportNotes, setReportNotes] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  const formatCurrency = (amount) => `₹${Number(amount || 0).toFixed(2)}`;

  const getWorkerAvatar = (user) => {
    if (!user) return "/default-avatar.png";
    if (user.profile_image) return user.profile_image;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=00796b&color=fff`;
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getUserBookings();
        setBookings(data);
        filterBookings("active", data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const filterBookings = (tab, data = bookings) => {
    let filteredList = [];
    switch (tab) {
      case "active":
        filteredList = data.filter(
          (b) =>
            (b.status === "accepted" || b.status === "completed") &&
            b.payment_status !== "paid"
        );
        break;
      case "paid":
        filteredList = data.filter(
          (b) =>
            b.payment_status === "paid" ||
            (b.balance_amount === 0 && b.payments?.length > 0)
        );
        break;
      case "pending":
        filteredList = data.filter((b) => b.status === "pending");
        break;
      case "cancelled":
        filteredList = data.filter((b) => b.status === "cancelled");
        break;
      default:
        filteredList = data;
    }
    setActiveTab(tab);
    setFiltered(filteredList);
  };

const handlePay = async (booking) => {
  const balanceRemaining = Number(booking.balance_amount || 0);
  if (balanceRemaining <= 0) return;

  try {
    setPayingId(booking.id);

    // Call backend to create Razorpay order
    const payment = await payBooking({
      bookingId: booking.id,
      amount: balanceRemaining,
    });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: balanceRemaining * 100,
      currency: "INR",
      name: "HireTech",
      description: "Booking Payment",
      order_id: payment.razorpay_order_id, // from backend
      handler: async function (response) {
        await confirmPayment(payment.id); // confirm via backend
        alert("Payment Successful!");
        const updatedBookings = await getUserBookings();
        setBookings(updatedBookings);
        filterBookings(activeTab, updatedBookings);
      },
      prefill: {
        name: booking.user?.username || "User",
        email: booking.user_email || "",
        contact: booking.user_phone || "",
      },
      theme: { color: "#00796b" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed. Try again.");
  } finally {
    setPayingId(null);
  }
};


  // --- Report No-Show modal functions ---
  const openReportModal = (booking) => {
    setReportingBooking(booking);
    setReportFiles([]);
    setReportNotes("");
    setShowReportModal(true);
  };

  const handleReportFilesChange = (e) => {
    setReportFiles(Array.from(e.target.files));
  };

  const submitNoShowReport = async () => {
    if (!reportingBooking) return;
    setSubmittingReport(true);
    try {
      const formData = new FormData();
      reportFiles.forEach(f => formData.append("files", f));
      if (reportNotes) formData.append("notes", reportNotes);

      await API.post(`/bookings/${reportingBooking.id}/submit_proof/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Proof submitted and investigation started!");
      setShowReportModal(false);

      const updatedBookings = await getUserBookings();
      setBookings(updatedBookings);
      filterBookings(activeTab, updatedBookings);

    } catch (err) {
      console.error("Failed to submit proof:", err);
      alert("Submission failed. Try again.");
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="paybookings-container">
      <h2 className="page-title">My Bookings</h2>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { key: "active", label: "Active", icon: <FiClock /> },
          { key: "paid", label: "Paid", icon: <FiCreditCard /> },
          { key: "pending", label: "Pending", icon: <FiUser /> },
          { key: "cancelled", label: "Cancelled", icon: <FiXCircle /> },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => filterBookings(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="bookings-grid"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length === 0 ? (
            <p className="no-bookings">No {activeTab} bookings available.</p>
          ) : (
            filtered.map((booking) => {
              const advancePaid = Number(booking.advance_amount || 0);
              const balanceRemaining = Number(booking.balance_amount || 0);
              const totalAmount = advancePaid + balanceRemaining;
              const isFullyPaid = balanceRemaining <= 0;

              return (
                <motion.div
                  key={booking.id}
                  className="booking-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="booking-header">
                    <img
                      src={getWorkerAvatar(booking.user)}
                      alt={booking.user?.username || "user"}
                      className="worker-avatar"
                    />
                    <h4>
                      <FiUser /> {booking.user?.username || "N/A"}
                    </h4>
                  </div>

                  <div className="booking-body">
                    <p><strong>Date:</strong> {booking.date || "N/A"}</p>
                    <p><strong>Total Amount:</strong> {formatCurrency(totalAmount)}</p>
                    <p><strong>Advance Paid:</strong> {formatCurrency(advancePaid)}</p>
                    <p>
                      <strong>Balance Remaining:</strong>{" "}
                      {isFullyPaid ? (
                        <span className="paid-text">
                          ₹0 <FiCheckCircle color="#00796b" />
                        </span>
                      ) : (
                        <span className="pending-text">
                          {formatCurrency(balanceRemaining)} <FiClock color="#004d40" />
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="booking-footer">
                    <button
                      className={isFullyPaid ? "paid-btn" : "pay-btn"}
                      disabled={isFullyPaid || payingId === booking.id}
                      onClick={() => handlePay(booking)}
                    >
                      {isFullyPaid
                        ? "Paid"
                        : payingId === booking.id
                        ? "Processing..."
                        : "Pay Balance"}
                    </button>

                    {/* Report No-Show button */}
                    {booking.status === "accepted" && (
                      <button
                        className="report-btn"
                        onClick={() => openReportModal(booking)}
                      >
                        <FiAlertCircle /> Report No-Show
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      {/* Report No-Show Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Report No-Show / Issue</h3>
            <textarea
              placeholder="Add notes (optional)"
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
            />
            <input type="file" multiple onChange={handleReportFilesChange} />
            <div className="modal-actions">
              <button onClick={() => setShowReportModal(false)} disabled={submittingReport}>Cancel</button>
              <button onClick={submitNoShowReport} disabled={submittingReport}>
                {submittingReport ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
