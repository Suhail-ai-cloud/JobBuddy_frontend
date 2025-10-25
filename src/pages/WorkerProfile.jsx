// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getWorkerById, getWorkerPortfolio, getReviews } from "../api/api";
// import ReviewCard from "../components/ReviewCard";
// import './styles/WorkerProfile.css';

// export default function WorkerProfilePage() {
//   const { id } = useParams();
//   const [worker, setWorker] = useState(null);
//   const [portfolio, setPortfolio] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const workerData = await getWorkerById(id);
//         const portfolioData = await getWorkerPortfolio(id);
//         const reviewsData = await getReviews(id);

//         setWorker(workerData);
//         setPortfolio(portfolioData.results || []);
//         setReviews(reviewsData.results || []);
//       } catch (err) {
//         console.error("Error fetching worker details:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!worker) return <p>Worker not found.</p>;

//   return (
//     <div className="worker-profile-page">
//       <div className="worker-header">
//         <img
//           src={worker.user.profile_image || "https://via.placeholder.com/250"}
//           alt={worker.user.username}
//           className="worker-profile-image"
//         />
//         <div className="worker-info">
//           <h1>{worker.user.first_name} {worker.user.last_name}</h1>
//           <p><strong>Location:</strong> {worker.user.location}</p>
//           <p><strong>Skills:</strong> {worker.skills}</p>
//           <p><strong>Rating:</strong> {worker.average_rating}</p>
//           <p><strong>Total Jobs:</strong> {worker.total_jobs}</p>
//           <button className="booking-button">Book Now</button>
//         </div>
//       </div>

//       <h2>Portfolio</h2>
//       <div className="portfolio-gallery">
//         {portfolio.length > 0 ? portfolio.map(item => (
//           <div key={item.id} className="portfolio-item">
//             <img
//               src={item.media_file || "https://via.placeholder.com/200"}
//               alt={item.title}
//             />
//             <p><strong>{item.title}</strong></p>
//             <p>{item.description}</p>
//           </div>
//         )) : <p>No portfolio items yet.</p>}
//       </div>

//       <h2>Reviews</h2>
//       <div className="reviews-list">
//         {reviews.length > 0 ? reviews.map(r => <ReviewCard key={r.id} review={r} />)
//           : <p>No reviews yet.</p>}
//       </div>
//     </div>
//   );
// }
