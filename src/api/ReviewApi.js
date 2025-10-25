import { API } from "./api"; // axios instance

// Fetch logged-in worker's reviews
export const getWorkerReviews = async () => {
  const res = await API.get("/reviews/my-reviews/");
  return res.data;
};

// Delete a specific review
export const deleteWorkerReview = async (id) => {
  return API.delete(`/reviews/${id}/`);
};
