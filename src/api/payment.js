import { API } from "./api";

// Get all bookings of the current user that are accepted or completed (unpaid)
export const getAcceptedBookings = async () => {
  const res = await API.get("/bookings/?my_bookings=user");
  const bookings = Array.isArray(res.data.results) ? res.data.results : [];

  return bookings.filter(
    (b) => b.status === "accepted" || (b.status === "completed" && b.payment_status !== "paid")
  );
};

// Make payment for a booking
export const payBooking = async ({ bookingId, amount }) => {
  const res = await API.post("/payments/create_payment/", { // <-- fixed endpoint
    booking: bookingId,
    amount,
    payment_type: "balance", // or "advance"
  });
  return res.data; // includes { id: payment.id, razorpay_order_id }
};

// Confirm payment
export const confirmPayment = async (paymentId) => {
  const res = await API.post(`/payments/${paymentId}/confirm/`);
  return res.data;
};

// Fetch all user bookings without filtering
export const getUserBookings = async () => {
  const res = await API.get("/bookings/?my_bookings=user");
  return Array.isArray(res.data.results) ? res.data.results : [];
};

// Remove this function entirely, it's redundant
// export const createRazorpayOrder = async ({ bookingId, amount }) => { ... }
