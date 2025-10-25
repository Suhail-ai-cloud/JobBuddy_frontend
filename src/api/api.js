// jobbuddy-frontend\src\api\api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";
export const MEDIA_BASE = API_BASE.replace("/api", ""); // auto matches backend URL

export const API = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to add access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


/* =============================
   USER PROFILE
============================= */
export const updateUserProfile = async (formData) => {
  // formData should be FormData if uploading image
  const res = await API.patch("/users/me/update/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE, // ✅ Django backend
});

export const updateWorkerAvailability = async (workerId, data) => {
  // data = { dates: ["2025-09-28"], type: "blocked" | "available" }
  const res = await API.post(`/worker-profiles/${workerId}/availability/`, data);
  return res.data;
};



export const getCurrentUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null; // don't make API call if no token

  try {
    const res = await API.get("/users/me/");
    return res.data;
  } catch (err) {
    console.error("Failed to get current user", err);
    return null;
  }
};




/* =============================
   WORKERS
============================= */
export const getWorkers = async () => (await API.get("/worker-profiles/")).data;
export const getWorkerById = async (id) => (await API.get(`/worker-profiles/${id}/`)).data;

/* =============================
   WORKER PORTFOLIO
============================= */

// Get all portfolios for a worker (you already have this)
export const getWorkerPortfolio = async (workerId) => {
  const res = await API.get(`/worker-portfolios/?worker_id=${workerId}`);
  return res.data;
};

export const createPortfolio = async (data) => {
  const res = await API.post("/worker-portfolios/", data);
  return res.data;
};

export const updatePortfolio = async (id, data) => {
  const res = await API.put(`/worker-portfolios/${id}/`, data);
  return res.data;
};


export const deletePortfolio = async (id) => await API.delete(`/worker-portfolios/${id}/`);

// Add media to a portfolio (optional separate endpoint)
export const addPortfolioMedia = async (portfolioId, formData) => {
  const res = await API.post(`/worker-portfolios/${portfolioId}/add_media/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete a media file from a portfolio
export const deletePortfolioMedia = async (portfolioId, mediaId) => {
  const res = await API.delete(`/worker-portfolios/${portfolioId}/delete-media/${mediaId}/`);
  return res.data;
};

// Get comments for a portfolio (you already have this)
export const getWorkerComments = async (portfolioId) =>
  (await API.get(`/worker-comments/?portfolio=${portfolioId}`)).data.results;


/* =============================
   REVIEWS
============================= */
/* =============================
   REVIEWS
============================= */

export const getReviews = async (workerId) => {
  if (!workerId) return [];
  const res = await API.get(`/reviews/?worker=${workerId}`);
  return res.data.results; // adjust based on your backend pagination
};

export const addReview = async (formData) => {
  const res = await API.post("/reviews/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const getWorkerCompletedBookings = async (workerId) => {
  if (!workerId) return [];
  const res = await API.get(`/worker/${workerId}/completed-bookings/`);
  return res.data; // backend should return list of completed bookings
};


/* =============================
   REVIEWS FOR SPECIFIC WORKER
============================= */
export const getWorkerReviews = async (workerId) => {
  if (!workerId) return [];
  // This hits the endpoint: /workers/<worker_id>/reviews/
  const res = await API.get(`/workers/${workerId}/reviews/`);
  return res.data.results ?? res.data; // adjust if backend uses pagination
};


export const getReviewsByBooking = async (bookingId) => {
  if (!bookingId) return [];
  const res = await API.get(`/reviews/?booking=${bookingId}`);
  return res.data.results;
};

/* =============================
   BOOKING
============================= */
export const createBooking = async (data) => (await API.post("/bookings/", data)).data;

/* =============================
   CART / WALLET / PAYMENTS
============================= */
export const getCart = async () => (await API.get("/cart/")).data;
export const addToCart = async (data) => (await API.post("/cart/", data)).data;
export const getWallet = async () => (await API.get("/wallet/")).data;
export const updateWallet = async (data) => (await API.put("/wallet/", data)).data;
export const makePayment = async (data) => (await API.post("/payments/", data)).data;


export async function getWorkerBookings() {
  const res = await API.get("/bookings/?my_bookings=worker"); 
  return res.data;
}

export async function updateBookingStatus(id, action) {
  const res = await API.post(`/bookings/${id}/${action}/`);
  return res.data;
}
/* =============================
   NOTIFICATIONS
============================= */
export const getNotifications = async () => {
  const res = await API.get("/notifications/");
  return res.data; // <--- this is the key
};
export const markNotificationRead = async (id) => {
  const res = await API.post(`/notifications/${id}/mark_read/`);
  return res.data;
};
export const deleteNotification = async (id) => {
  const res = await API.delete(`/notifications/${id}/`);
  return res.data;
};



export const createReview = async (bookingId, comment, rating) => {
  const response = await API.post("/reviews/", {
    booking: bookingId,
    comment,
    rating,
  });
  return response.data;
};
export const updateReview = async (id, data) => {
  const res = await API.patch(`/reviews/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteReview = async (id) => {
  await API.delete(`/reviews/${id}/`);
};

// api.js
export const searchWorkers = async ({ q = "", category, location, sort }) => {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (category) params.append("category", category);
  if (location) params.append("location", location);
  if (sort) params.append("sort", sort);

  const res = await API.get(`/search/workers/?${params.toString()}`);
  return res.data.results;
};

export const getWorkerAvailability = async (id) => {
  const res = await API.get(`/worker-profiles/${id}/availability/`);
  return res.data;
};
/* =============================
   WORKER VERIFICATION
============================= */
// api.js
export const sendWorkerVerificationRequest = async (formData) => {
  return await API.patch("/worker/verification/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Optionally, get status of verification

export const getWorkerVerificationStatus = async () => {
  const res = await API.get("/worker/verification/");  // singular, matches your Django route
  return res.data;
};
export const createVerificationPayment = async () => {
  const res = await API.post("/worker/verification/payment/create/");
  return res.data;
};

export const confirmVerificationPayment = async (data) => {
  const res = await API.post("/worker/verification/payment/confirm/", data);
  return res.data;
};

export const deleteBooking = async (id) => {
  try {
    const response = await API.delete(`/bookings/${id}/`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete booking:", err);
    throw err;
  }
};

// src/api/api.js
export const reportWorker = async (formData) => {
  const token = localStorage.getItem("access_token");
  const res = await API.post("/worker-reports/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const payBooking = async ({ bookingId, amount }) => {
  const res = await API.post("/payments/create_payment/", {
    booking: bookingId,
    amount,
    payment_type: "balance", // or "advance" if you handle advance separately
  });
  return res.data;
};

export const confirmPayment = async (paymentId) => {
  const res = await API.post(`/payments/${paymentId}/confirm/`);
  return res.data;
};

export const getUserBookings = async () => {
  const res = await API.get("/bookings/?my_bookings=user");
  return res.data;
};