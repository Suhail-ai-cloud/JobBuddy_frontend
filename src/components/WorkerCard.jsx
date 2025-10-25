import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/WorkerCard.css';
import { FaShieldAlt } from "react-icons/fa"; // secure/safe icon

export default function WorkerCard({ worker }) {
  const navigate = useNavigate();
  const rating = worker.average_rating || worker.rating || 0;
  const ratingColor = rating >= 3.5 ? "#2ecc71" : "#f1c40f";

  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="worker-card" onClick={() => navigate(`/workers/${worker.id}`)}>
      <div className="worker-image-container">
        <img
  src={
    worker.user?.profile_image ||   // HomePage case
    worker.user_profile_image ||    // SearchPage case (if API returns this field)
    "https://via.placeholder.com/150"
  }
  alt={`${worker.first_name || worker.user?.first_name} ${worker.last_name || worker.user?.last_name}`}
/>

        {worker.verified && <FaShieldAlt className="verified-badge" title="Secure / Verified" />}
      </div>
      <div className="worker-info">
        <h3 className="worker-name">
          {worker.user.first_name} {worker.user.last_name}
        </h3>
        <p className="worker-skill">{worker.skills || "Not specified"}</p>
        <div className="worker-meta">
          <div className="worker-rating" style={{ color: ratingColor }}>
            {Array(filledStars).fill("★").map((star, i) => <span key={`f-${i}`}>{star}</span>)}
            {halfStar && <span>☆</span>}
            {Array(emptyStars).fill("☆").map((star, i) => <span key={`e-${i}`}>{star}</span>)}
          </div>
          <span className="worker-jobs">{worker.total_jobs || 0} jobs</span>
        </div>
      </div>
    </div>
  );
}
