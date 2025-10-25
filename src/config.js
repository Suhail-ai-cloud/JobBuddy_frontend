// src/config.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;

export { API_BASE, GOOGLE_CLIENT_ID, RAZORPAY_KEY };