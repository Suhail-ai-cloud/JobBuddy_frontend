// // jobbuddy-frontend\src\api\Booking.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8000/api";
// const token = localStorage.getItem("access_token"); // or wherever you store JWT

// export const getWorkerAvailability = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/worker-profiles/me/availability/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error("Failed to fetch availability:", err);
//     return { available_dates: [], booked_dates: [], blocked_dates: [] };
//   }
// };

// export const updateWorkerAvailability = async ({ dates, type }) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/worker-profiles/me/availability/`,
//       { dates, type },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (err) {
//     console.error("Failed to update availability:", err);
//     throw err;
//   }
// };
// jobbuddy-frontend\src\api\Booking.js
import { API } from "./api"; // use centralized API instance

// Get worker availability
export const getWorkerAvailability = async () => {
  try {
    const response = await API.get("/worker-profiles/me/availability/");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch availability:", err);
    return { available_dates: [], booked_dates: [], blocked_dates: [] };
  }
};

// Update worker availability
export const updateWorkerAvailability = async ({ dates, type }) => {
  try {
    const response = await API.post("/worker-profiles/me/availability/", {
      dates,
      type,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to update availability:", err);
    throw err;
  }
};
