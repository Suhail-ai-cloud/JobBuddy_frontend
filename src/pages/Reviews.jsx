import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { API } from "../api/api"; // Axios instance
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewFormPage";
import "./styles/Reviews.css";

export default function WorkerReviewsPage() {
  const { workerId } = useParams();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking");

  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [workerId]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/workers/${workerId}/reviews/`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  return (
    <div className="worker-reviews-page">
      <div className="reviews-header">
        <h2>Reviews for Worker {workerId}</h2>
        <button className="btn-write-review" onClick={() => setShowForm(true)}>
          Write a Review
        </button>
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewForm
              workerId={workerId}
              bookingId={bookingId}
              onReviewAdded={() => {
                fetchReviews();
                setShowForm(false);
              }}
            />
            <button className="modal-close-btn" onClick={() => setShowForm(false)}>
              ×
            </button>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
