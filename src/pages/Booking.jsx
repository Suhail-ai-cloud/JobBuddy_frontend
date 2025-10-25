
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { MEDIA_BASE } from "../api/api";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiCamera, FiX, FiMapPin, FiStar, FiTool } from "react-icons/fi";
import {
  API,
  createBooking,
  getWorkerById,
  getWorkerAvailability,
  getWorkerBookings,
} from "../api/api";
import "./styles/BookingPage.css";

const resolveImage = (url) =>
  !url
    ? "https://via.placeholder.com/120"
    : url.startsWith("http")
    ? url
    : `${MEDIA_BASE}${url.startsWith("/") ? "" : "/"}${url}`;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BookingPage() {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);
  const [availability, setAvailability] = useState({
    available_dates: [],
    booked_dates: [],
    blocked_dates: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch worker & availability
  useEffect(() => {
    async function fetchWorkerData() {
      try {
        const workerData = await getWorkerById(id);
        setWorker(workerData);
        const availabilityData = await getWorkerAvailability(id);
        setAvailability(availabilityData);
      } catch (err) {
        console.error("Failed to fetch worker or availability:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkerData();
  }, [id]);

  // Set default advance amount
  useEffect(() => {
    if (worker?.advance_amount) setAdvanceAmount(worker.advance_amount);
  }, [worker]);

  // Update available times based on date
  useEffect(() => {
    if (!selectedDate || !worker) return;
    const dateStr = formatDate(selectedDate);
    const defaultSlots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

    async function updateAvailableTimes() {
      try {
        const bookingsData = await getWorkerBookings(worker.id, dateStr);
        const bookingsArray = Array.isArray(bookingsData) ? bookingsData : bookingsData.results || [];
        const bookedSlots = bookingsArray.filter((b) => ["pending", "accepted"].includes(b.status)).map((b) => b.slot);
        setAvailableTimes(defaultSlots.filter((slot) => !bookedSlots.includes(slot)));
        setTime("");
      } catch {
        setAvailableTimes(defaultSlots);
      }
    }
    updateAvailableTimes();
  }, [selectedDate, worker]);

  const handleImagesChange = (e) => {
    if (e.target.files.length + images.length > 6) {
      alert("Maximum 6 images allowed");
      return;
    }
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const resetForm = () => {
    setSelectedDate(null);
    setTime("");
    setDescription("");
    setLocation("");
    setNotes("");
    setAdvanceAmount(worker?.advance_amount || 0);
    setImages([]);
  };

const handleBooking = async () => {
  if (!selectedDate || !time || !description || !location || advanceAmount <= 0) {
    alert("Please fill all required fields.");
    return;
  }

  setSubmitting(true);

  try {
    // 1️⃣ First, create the booking in the backend (without payment confirmed yet)
    const formData = new FormData();
    formData.append("worker", worker.id);
    formData.append("date", formatDate(selectedDate));
    formData.append("time", time);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("notes", notes);
    formData.append("advance_amount", advanceAmount);
    images.forEach(img => formData.append("images", img));

    const bookingRes = await API.post("/bookings/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const bookingId = bookingRes.data.id;

    // 2️⃣ Create Razorpay order via PaymentViewSet
    const paymentRes = await API.post("/payments/create_payment/", {
      booking: bookingId,
      amount: advanceAmount,
      payment_type: "advance",
    });

    const payment = paymentRes.data;

    // 3️⃣ Initialize Razorpay
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: payment.amount * 100, // in paise
      currency: "INR",
      name: "HireTech",
      description: "Advance Payment",
      order_id: payment.razorpay_order_id,
      handler: async function (response) {
        try {
          // 4️⃣ Confirm payment in backend
          await API.post(`/payments/${payment.id}/confirm/`, {
            transaction_id: response.razorpay_payment_id,
            method: "razorpay",
          });

          alert("✅ Payment successful! Booking confirmed.");
        } catch (err) {
          console.error("Payment confirmation failed:", err);
          alert("Payment succeeded, but confirmation failed. Contact support.");
        }
      },
      prefill: {
        name: worker.user.first_name,
        email: worker.user.email,
      },
      theme: { color: "#00796b" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error("Booking/payment failed:", err);
    alert("Booking/payment failed. Try again.");
  } finally {
    setSubmitting(false);
  }
};



  if (loading) return <p className="loading">Loading worker details...</p>;
  if (!worker) return <p className="error">Worker not found.</p>;

  const unavailableDates = [...(availability?.booked_dates || []), ...(availability?.blocked_dates || [])].map(d => new Date(d));

  return (
    <div className="booking-page-container">

      {/* ================= Booking Form ================= */}
      <motion.div
        className="booking-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>Book an Appointment</h3>

        <label>Select Date:</label>
        <DatePicker
          key={selectedDate ? selectedDate.toString() : "empty"}
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          minDate={new Date()}
          excludeDates={unavailableDates}
          placeholderText="Select an available date"
        />

        <label>Select Time:</label>
        <select value={time} onChange={e => setTime(e.target.value)}>
          <option value="">Select a time slot</option>
          {availableTimes.length ? availableTimes.map(slot => <option key={slot} value={slot}>{slot}</option>) : <option disabled>No available slots</option>}
        </select>

        <label>Short Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the work..." />

        <label>Location Details:</label>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Work location..." />

        <label>Optional Notes:</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes..." />

        <label>Upload Images (max 6):</label>
        <div className="image-upload-icon" onClick={() => document.getElementById("image-input").click()}>
          <FiCamera size={28} /> <span>Click to upload</span>
        </div>
        <input type="file" id="image-input" multiple accept="image/*" style={{ display: "none" }} onChange={handleImagesChange} />

        <div className="image-preview-container">
          <AnimatePresence>
            {images.map((img, idx) => (
              <motion.div key={idx} className="image-preview" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} whileHover={{scale:1.1}}>
                <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} />
                <button onClick={() => removeImage(idx)}><FiX /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <label>Advance Amount (₹):</label>
        <input type="number" value={advanceAmount} onChange={e => setAdvanceAmount(Number(e.target.value))} min="0" />

        <button onClick={handleBooking} disabled={submitting}>
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>

        {message && <p className="booking-message">{message}</p>}
      </motion.div>
      <div className="booking-terms">
  <h3>Booking Terms & Conditions</h3>
  <p>
    **By booking a service, you agree to the following terms. Payments must be made securely via Razorpay, with advance payment at the time of booking and remaining balance after service completion. Bookings are only valid on available dates; if a worker is unavailable, any advance payment will be refunded. Cancellation before worker acceptance will result in a full refund, while cancellations after acceptance may result in partial or no refund based on worker policy. A booking is marked as "completed" when the worker finishes the service and the user confirms. In case of no-shows or issues, payments may be held until investigation. Users may submit proof for disputes, and the support team will resolve them fairly, determining if the payment goes to the user or worker. Users are responsible for providing accurate information and access, and workers are expected to perform professionally. The platform is not liable for indirect losses. All personal and payment information is kept confidential. Proceeding with a booking indicates acceptance of these terms.**
  </p>
</div>

    </div>
  );
}
