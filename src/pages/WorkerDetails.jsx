
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import PortfolioCard from "../components/WorkerPortfolioCard";
// import ReviewCard from "../components/ReviewCard";
// import { getWorkerById, getWorkerPortfolio, getWorkerReviews, reportWorker } from "../api/api";
// import { FiMapPin, FiStar, FiBriefcase } from "react-icons/fi";
// import "./styles/WorkerDetails.css";

// export default function WorkerDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [worker, setWorker] = useState(null);
//   const [portfolios, setPortfolios] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [reportModalOpen, setReportModalOpen] = useState(false);
//   const [reportData, setReportData] = useState({
//     report_type: "",
//     description: "",
//     evidence: null,
//   });
//   const [submittingReport, setSubmittingReport] = useState(false);

//   const currentUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchWorkerData = async () => {
//       try {
//         const workerData = await getWorkerById(id);
//         setWorker(workerData);

//         const portfolioData = await getWorkerPortfolio(id);
//         setPortfolios(portfolioData.results || []);

//         const reviewData = await getWorkerReviews(id);
//         setReviews(reviewData || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWorkerData();
//   }, [id]);

//   const handleReportSubmit = async (e) => {
//     e.preventDefault();
//     if (!reportData.report_type || !reportData.description) return alert("Please fill all fields.");

//     const formData = new FormData();
//     formData.append("worker", worker.id);
//     formData.append("report_type", reportData.report_type);
//     formData.append("description", reportData.description);
//     if (reportData.evidence) formData.append("evidence", reportData.evidence);

//     setSubmittingReport(true);
//     try {
//       await reportWorker(formData);
//       alert("Report submitted successfully!");
//       setReportModalOpen(false);
//       setReportData({ report_type: "", description: "", evidence: null });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit report.");
//     } finally {
//       setSubmittingReport(false);
//     }
//   };

//   if (loading) return <p className="loading-text">Loading...</p>;
//   if (!worker) return <p className="loading-text">Worker not found.</p>;

//   return (
//     <motion.div
//       className="worker-details-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Worker Info Header */}
//       <motion.div
//         className="worker-header"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="worker-img-container">
//           <img
//             src={worker.user.profile_image || "https://via.placeholder.com/200x200?text=No+Image"}
//             alt={worker.user.username}
//             className="worker-profile-image"
//           />
//         </div>
//         <div className="worker-info">
//           <h1>{worker.user.first_name} {worker.user.last_name}</h1>
//           <div className="worker-meta">
//             <p><FiMapPin /> {worker.user.location || "N/A"}</p>
//             <p><FiStar /> {worker.average_rating || 0} Rating</p>
//             <p><FiBriefcase /> {worker.total_jobs || 0} Jobs</p>
//           </div>
//           {worker.skills && <p className="worker-skills">{worker.skills}</p>}
//           {worker.verified && <span className="verified-badge">✅ Verified</span>}
//           <button className="book-btn" onClick={() => navigate(`/booking/${worker.id}`)}>Book Now</button>
//           <button className="report-btn" onClick={() => setReportModalOpen(true)}>Report Worker</button>
//         </div>
//       </motion.div>

//       <hr className="section-divider" />

//       {/* Portfolio Section */}
//       <div className="portfolio-section">
//         <h2>Portfolio / Gallery</h2>
//         <div className="portfolio-grid">
//           <AnimatePresence>
//             {portfolios.length > 0 ? portfolios.map((portfolio) => (
//               <motion.div
//                 key={portfolio.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <PortfolioCard portfolio={portfolio} showActions={false} />
//               </motion.div>
//             )) : <p className="empty-text">No portfolios yet.</p>}
//           </AnimatePresence>
//         </div>
//       </div>

//       <hr className="section-divider" />

//       {/* Reviews Section */}
//       <div className="reviews-section">
//         <h2>Reviews</h2>
//         <div className="reviews-grid">
//           <AnimatePresence>
//             {reviews.length > 0 ? reviews.map((review) => (
//               <motion.div
//                 key={review.id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <ReviewCard review={review} />
//               </motion.div>
//             )) : <p className="empty-text">No reviews yet.</p>}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* REPORT MODAL */}
//       <AnimatePresence>
//         {reportModalOpen && (
//           <motion.div
//             className="modal-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setReportModalOpen(false)}
//           >
//             <motion.div
//               className="modal-content"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2>Report Worker</h2>
//               <form onSubmit={handleReportSubmit}>
//                 <label>Report Type</label>
//                 <select
//                   value={reportData.report_type}
//                   onChange={(e) => setReportData(prev => ({ ...prev, report_type: e.target.value }))}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="no_show">No Show</option>
//                   <option value="incomplete_work">Incomplete Work</option>
//                   <option value="misconduct">Misconduct</option>
//                   <option value="other">Other</option>
//                 </select>

//                 <label>Description</label>
//                 <textarea
//                   value={reportData.description}
//                   onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
//                   placeholder="Describe the issue..."
//                   required
//                 />

//                 <label>Evidence (optional)</label>
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={(e) => setReportData(prev => ({ ...prev, evidence: e.target.files[0] }))}
//                 />

//                 <button type="submit" disabled={submittingReport}>
//                   {submittingReport ? "Submitting..." : "Submit Report"}
//                 </button>
//                 <button type="button" className="cancel-btn" onClick={() => setReportModalOpen(false)}>Cancel</button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiStar, FiBriefcase, FiAlertCircle } from "react-icons/fi";
import PortfolioCard from "../components/WorkerPortfolioCard";
import ReviewCard from "../components/ReviewCard";
import {
  getWorkerById,
  getWorkerPortfolio,
  getWorkerReviews,
  reportWorker,
} from "../api/api";
import "./styles/WorkerDetails.css";

export default function WorkerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({
    report_type: "",
    description: "",
    evidence: null,
  });
  const [submittingReport, setSubmittingReport] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const workerData = await getWorkerById(id);
        setWorker(workerData);

        const portfolioData = await getWorkerPortfolio(id);
        setPortfolios(portfolioData.results || []);

        const reviewData = await getWorkerReviews(id);
        setReviews(reviewData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerData();
  }, [id]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportData.report_type || !reportData.description)
      return alert("Please fill all fields.");

    const formData = new FormData();
    formData.append("worker", worker.id);
    formData.append("report_type", reportData.report_type);
    formData.append("description", reportData.description);
    if (reportData.evidence) formData.append("evidence", reportData.evidence);

    setSubmittingReport(true);
    try {
      await reportWorker(formData);
      alert("Report submitted successfully!");
      setReportModalOpen(false);
      setReportData({ report_type: "", description: "", evidence: null });
    } catch (err) {
      console.error(err);
      alert("Failed to submit report.");
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!worker) return <p className="loading-text">Worker not found.</p>;

  return (
    <motion.div
      className="worker-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Worker Info Header */}
      <motion.div
        className="worker-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="worker-img-container">
          <img
            src={worker.user.profile_image || "https://via.placeholder.com/200x200?text=No+Image"}
            alt={worker.user.username}
            className="worker-profile-image"
          />
        </div>

        <div className="worker-info">
          <h1>{worker.user.first_name} {worker.user.last_name}</h1>
          <div className="worker-meta">
            <p><FiMapPin /> {worker.user.location || "N/A"}</p>
            <p><FiStar /> {worker.average_rating || 0} Rating</p>
            <p><FiBriefcase /> {worker.total_jobs || 0} Jobs</p>
          </div>
          {worker.skills && <p className="worker-skills">{worker.skills}</p>}
          {worker.verified && <span className="verified-badge">✅ Verified</span>}

          <div className="header-buttons">
            <button className="book-btn" onClick={() => navigate(`/booking/${worker.id}`)}>Book Now</button>
            <button className="report-btn" onClick={() => setReportModalOpen(true)}>
              <FiAlertCircle size={18} style={{ marginRight: "6px" }} />
              Report Worker
            </button>
          </div>
        </div>
      </motion.div>

      <hr className="section-divider" />

      {/* Portfolio Section */}
      <div className="portfolio-section">
        <h2>Portfolio / Gallery</h2>
        <div className="portfolio-grid">
          <AnimatePresence>
            {portfolios.length > 0 ? portfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioCard portfolio={portfolio} showActions={false} />
              </motion.div>
            )) : <p className="empty-text">No portfolios yet.</p>}
          </AnimatePresence>
        </div>
      </div>

      <hr className="section-divider" />

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        <div className="reviews-grid">
          <AnimatePresence>
            {reviews.length > 0 ? reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            )) : <p className="empty-text">No reviews yet.</p>}
          </AnimatePresence>
        </div>
      </div>

      {/* REPORT MODAL */}
      <AnimatePresence>
        {reportModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReportModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Report Worker</h2>
              <form onSubmit={handleReportSubmit}>
                <label>Report Type</label>
                <select
                  value={reportData.report_type}
                  onChange={(e) => setReportData(prev => ({ ...prev, report_type: e.target.value }))}
                  required
                >
                  <option value="">Select</option>
                  <option value="no_show">No Show</option>
                  <option value="incomplete_work">Incomplete Work</option>
                  <option value="misconduct">Misconduct</option>
                  <option value="other">Other</option>
                </select>

                <label>Description</label>
                <textarea
                  value={reportData.description}
                  onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the issue..."
                  required
                />

                <label>Evidence (optional)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setReportData(prev => ({ ...prev, evidence: e.target.files[0] }))}
                />

                <div className="modal-buttons">
                  <button type="submit" className="submit-btn" disabled={submittingReport}>
                    {submittingReport ? "Submitting..." : "Submit Report"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setReportModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
