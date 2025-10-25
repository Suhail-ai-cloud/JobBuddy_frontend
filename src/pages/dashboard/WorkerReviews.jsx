// import React, { useEffect, useState } from "react";
// import { getCurrentUser, getWorkerReviews, deleteReview } from "../../api/api";
// import ReviewCard from "../../components/ReviewCard";
// import "./styles/WorkerReviewsPage.css";

// export default function WorkerReviewsDashboard() {
//   const [user, setUser] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const userData = await getCurrentUser();
//         if (!userData?.worker_profile?.id) throw new Error("Worker profile not found");
//         setUser(userData);

//         const workerId = userData.worker_profile.id;
//         const reviewData = await getWorkerReviews(workerId);

//         // Adjust depending on API structure
//         setReviews(reviewData.results || reviewData || []);
//       } catch (err) {
//         console.error("Error fetching reviews:", err);
//         alert("Failed to fetch reviews. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       await deleteReview(id);
//       setReviews((prev) => prev.filter((r) => r.id !== id));
//       alert("Review deleted successfully");
//     } catch (err) {
//       console.error("Error deleting review:", err);
//       alert("Failed to delete review");
//     }
//   };

//   if (loading) return <p>Loading reviews...</p>;
//   if (!user) return <p>User not found.</p>;

//   return (
//     <div className="worker-reviews-container">
//       <h2>My Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <div className="reviews-grid">
//           {reviews.map((review) => (
//             <div key={review.id} className="review-card-wrapper">
//               <ReviewCard review={review} />
//               <button
//                 className="review-delete-btn"
//                 onClick={() => handleDelete(review.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, getWorkerReviews, deleteReview } from "../../api/api";
import "./styles/WorkerReviewsPage.css";

export default function WorkerReviewsDashboard() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData?.worker_profile?.id) throw new Error("Worker profile not found");
        setUser(userData);

        const workerId = userData.worker_profile.id;
        const reviewData = await getWorkerReviews(workerId);
        setReviews(reviewData.results || reviewData || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        alert("Failed to fetch reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      alert("Review deleted successfully");
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="loading-text">Loading reviews...</p>;
  if (!user) return <p className="loading-text">User not found.</p>;

  return (
    <div className="worker-reviews-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.first_name || user.username}</h1>
        <p>Manage your reviews and showcase your work</p>
      </header>

      <main className="reviews-section">
        {reviews.length === 0 ? (
          <p className="no-reviews-text">You have no reviews yet.</p>
        ) : (
          <div className="reviews-grid">
            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="review-card-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="review-card">
                    <div className="review-avatar">
                      {review.user?.username?.charAt(0) || "U"}
                    </div>
                    <div className="review-content">
                      <span className="review-username">{review.user.username}</span>
                      <span className="review-text">{review.comment}</span>
                    </div>
                  </div>
                  <button
                    className="review-delete-btn"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} WorkerHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
