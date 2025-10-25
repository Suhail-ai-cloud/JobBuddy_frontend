
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage, FiVideo } from "react-icons/fi";
import "./styles/ReviewCard.css";

export default function ReviewCard({ review }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleOpenPopup = (index) => {
    setCurrentMedia(index);
    setShowPopup(true);
  };
  const handleClosePopup = () => setShowPopup(false);
  const handlePrev = () =>
    setCurrentMedia((prev) =>
      prev === 0 ? review.media.length - 1 : prev - 1
    );
  const handleNext = () =>
    setCurrentMedia((prev) =>
      prev === review.media.length - 1 ? 0 : prev + 1
    );

  const truncatedComment =
    review.comment.length > 160 && !expanded
      ? review.comment.slice(0, 160) + "..."
      : review.comment;

  const hasMedia = review.media && review.media.length > 0;

  return (
    <>
      <motion.div
        className="rc-card-modern"
        whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      >
        {/* Header */}
        <div className="rc-card-header">
          <strong className="rc-user">{review.user_name}</strong>
          <div className="rc-rating-stars">{review.rating} ⭐</div>
        </div>

        {/* Comment with 160 char rule */}
        <div className="rc-comment-text">{truncatedComment}</div>
        {review.comment.length > 160 && (
          <button
            className="rc-toggle-btn"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Media preview */}
        <div className="rc-media-strip">
          {hasMedia ? (
            review.media.map((m, idx) => (
              <div
                key={idx}
                className="rc-media-thumb"
                onClick={() => handleOpenPopup(idx)}
              >
                {m.file.endsWith(".mp4") ? (
                  <video src={m.file} className="rc-thumb-video" />
                ) : (
                  <img src={m.file} alt="review media" className="rc-thumb-img" />
                )}
              </div>
            ))
          ) : (
            <div className="rc-media-placeholder">
              <FiImage size={30} color="#00796b" />
              <p>No Media</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Media Popup */}
      <AnimatePresence>
        {showPopup && hasMedia && (
          <motion.div
            className="rc-popup-overlay"
            onClick={handleClosePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rc-popup-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button className="rc-popup-close" onClick={handleClosePopup}>
                ×
              </button>
              <button className="rc-popup-prev" onClick={handlePrev}>
                ‹
              </button>
              <div className="rc-popup-media-container">
                {review.media[currentMedia].file.endsWith(".mp4") ? (
                  <video
                    src={review.media[currentMedia].file}
                    controls
                    autoPlay
                    className="rc-popup-media"
                  />
                ) : (
                  <img
                    src={review.media[currentMedia].file}
                    alt="preview"
                    className="rc-popup-media"
                  />
                )}
              </div>
              <button className="rc-popup-next" onClick={handleNext}>
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
