import React, { useState } from "react";
import { API } from "../api/api";
import "./styles/ReviewFormPage.css";

export default function ReviewForm({ workerId, bookingId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // max 5 files
    setMediaFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 5);
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return alert("Select a rating");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("worker", workerId);
      formData.append("booking", bookingId);

      mediaFiles.forEach((file) => formData.append("mediaFiles", file));

      await API.post("/reviews/", formData);
      setRating(0);
      setComment("");
      setMediaFiles([]);
      onReviewAdded(); // refresh reviews
    } catch (err) {
      console.error("Failed to add review:", err);
      alert("Error adding review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="review-form-modern"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3>Write a Review</h3>

      <label className="form-label">
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        />
      </label>

      {/* Drag & Drop Media */}
      <div className="dropzone">
        <p>Drag & drop images/videos here (max 5) or click to select</p>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {/* Media Preview */}
      {mediaFiles.length > 0 && (
        <div className="media-preview">
          {mediaFiles.map((file, idx) =>
            file.type.startsWith("video") ? (
              <video key={idx} src={URL.createObjectURL(file)} controls />
            ) : (
              <img key={idx} src={URL.createObjectURL(file)} alt="preview" />
            )
          )}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
