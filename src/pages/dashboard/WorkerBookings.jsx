
// // import React, { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { getWorkerBookings, updateBookingStatus } from "../../api/api";
// // import { FiX, FiEye } from "react-icons/fi";
// // import "./styles/WorkerBookings.css";

// // const formatDate = (dateStr) => {
// //   const date = new Date(dateStr);
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, "0");
// //   const day = String(date.getDate()).padStart(2, "0");
// //   return `${year}-${month}-${day}`;
// // };

// // export default function WorkerBookings() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [zoomImage, setZoomImage] = useState(null);

// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);


// //   const fetchBookings = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getWorkerBookings();
// //       const bookingsArray = Array.isArray(data) ? data : data.results || [];

// //       const formattedBookings = bookingsArray
// //         .map((b) => ({ ...b, date: formatDate(b.date) }))
// //         .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // newest first

// //       setBookings(
// //         formattedBookings.filter(
// //           (b) => b.status !== "completed" && b.status !== "rejected"
// //         )
// //       );
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to fetch bookings.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAction = async (id, action) => {
// //     // Optimistic update
// //     setBookings((prev) =>
// //       prev
// //         .map((b) =>
// //           b.id === id
// //             ? {
// //               ...b,
// //               status:
// //                 action === "complete"
// //                   ? "completed"
// //                   : action === "accept"
// //                     ? "accepted"
// //                     : "rejected",
// //             }
// //             : b
// //         )
// //         .filter((b) => b.status !== "completed" && b.status !== "rejected") // remove finished
// //     );

// //     try {
// //       await updateBookingStatus(id, action);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to update booking status.");
// //       fetchBookings(); // rollback
// //     }
// //   };

// //   if (loading) return <div className="loading">Loading bookings...</div>;
// //   if (error) return <div className="error">{error}</div>;

// //   return (
// //     <div className="worker-bookings-container">
// //       <h2>My Bookings</h2>
// //       {bookings.length === 0 ? (
// //         <p>No bookings found.</p>
// //       ) : (
// //         <table className="bookings-table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>User</th>
// //               <th>Date</th>
// //               <th>Slot</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //               <th>Details</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bookings.map((booking) => (
// //               <tr key={booking.id}>
// //                 <td>{booking.id}</td>
// //                 <td>{booking.user}</td>
// //                 <td>{booking.date}</td>
// //                 <td>{booking.slot || "-"}</td>
// //                 <td>{booking.status}</td>
// //                 <td>
// //                   {booking.status === "pending" && (
// //                     <>
// //                       <motion.button
// //                         whileHover={{ scale: 1.05 }}
// //                         whileTap={{ scale: 0.95 }}
// //                         className="accept-btn"
// //                         onClick={() => handleAction(booking.id, "accept")}
// //                       >
// //                         Accept
// //                       </motion.button>
// //                       <motion.button
// //                         whileHover={{ scale: 1.05 }}
// //                         whileTap={{ scale: 0.95 }}
// //                         className="reject-btn"
// //                         onClick={() => handleAction(booking.id, "reject")}
// //                       >
// //                         Reject
// //                       </motion.button>
// //                     </>
// //                   )}
// //                   {booking.status === "accepted" && (
// //                     <motion.button
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       className="complete-btn"
// //                       onClick={() => handleAction(booking.id, "complete")}
// //                     >
// //                       Complete
// //                     </motion.button>
// //                   )}
// //                   {(booking.status === "rejected" ||
// //                     booking.status === "completed") && <span>—</span>}
// //                 </td>
// //                 <td>
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className="view-details-btn"
// //                     onClick={() => setSelectedBooking(booking)}
// //                   >
// //                     <FiEye /> View
// //                   </motion.button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}

// //       {/* Booking Details Modal */}
// //       <AnimatePresence>
// //   {selectedBooking && (
// //     <motion.div
// //       className="modal-overlay"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       onClick={() => setSelectedBooking(null)}
// //     >
// //       <motion.div
// //         className="modal-content booking-modal"
// //         initial={{ scale: 0.8 }}
// //         animate={{ scale: 1 }}
// //         exit={{ scale: 0.8 }}
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="modal-header">
// //           <h3>Booking #{selectedBooking.id} Details</h3>
// //           <FiX className="close-icon" onClick={() => setSelectedBooking(null)} />
// //         </div>

// //         {/* Body */}
// //         <div className="modal-body">

// //           {/* Top Info Grid */}
// //           <div className="booking-info-grid">
// //             <div className="info-card">
// //               <strong>User:</strong> {selectedBooking.user}
// //             </div>
// //             <div className="info-card">
// //               <strong>Date:</strong> {selectedBooking.date}
// //             </div>
// //             <div className="info-card">
// //               <strong>Status:</strong> 
// //               <span className={`status-badge ${selectedBooking.status}`}>
// //                 {selectedBooking.status}
// //               </span>
// //             </div>
// //             <div className="info-card">
// //               <strong>Advance:</strong> ₹{selectedBooking.advance_amount}
// //             </div>
// //             <div className="info-card">
// //               <strong>Location:</strong> {selectedBooking.location}
// //             </div>
// //           </div>

// //           {/* Description & Notes */}
// //           <div className="text-section">
// //             <p><strong>Description:</strong> {selectedBooking.description}</p>
// //             <p><strong>Notes:</strong> {selectedBooking.notes || "-"}</p>
// //           </div>

// //           {/* Payments Section */}
// //           {selectedBooking.payments?.length > 0 && (
// //             <div className="payments-section">
// //               <h4>Payments</h4>
// //               <ul>
// //                 {selectedBooking.payments.map((p) => (
// //                   <li key={p.id}>
// //                     <strong>Amount:</strong> ₹{p.amount} | <strong>Status:</strong> {p.status} | <strong>Commission:</strong> ₹{p.commission}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}

// //           {/* Images Section */}
// //           <div className="images-section">
// //             <h4>Images</h4>
// //             <div className="images-grid">
// //               {selectedBooking.images?.length > 0 ? (
// //                 selectedBooking.images.map((img, idx) => (
// //                   <img
// //                     key={idx}
// //                     src={img.file || "https://via.placeholder.com/150"}
// //                     alt={`booking-${idx}`}
// //                     onClick={() => setZoomImage(img.file || "https://via.placeholder.com/150")}
// //                   />
// //                 ))
// //               ) : (
// //                 <p>No images available</p>
// //               )}
// //             </div>
// //           </div>

// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   )}
// // </AnimatePresence>

// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { getWorkerBookings, updateBookingStatus } from "../../api/api";
// import { FiX, FiEye } from "react-icons/fi";
// import "./styles/WorkerBookings.css";

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// export default function WorkerBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [zoomImage, setZoomImage] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const data = await getWorkerBookings({ my_bookings: "worker" });
//       const bookingsArray = Array.isArray(data) ? data : data.results || [];
//       const formattedBookings = bookingsArray
//         .map((b) => ({ ...b, date: formatDate(b.date) }))
//         .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//       // Only show bookings that worker can act on
//       setBookings(
//         formattedBookings.filter(
//           (b) => b.status === "pending" || b.status === "accepted"
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     setBookings((prev) =>
//       prev
//         .map((b) =>
//           b.id === id
//             ? {
//                 ...b,
//                 status:
//                   action === "complete"
//                     ? "completed"
//                     : action === "accept"
//                     ? "accepted"
//                     : "rejected",
//               }
//             : b
//         )
//         .filter((b) => b.status === "pending" || b.status === "accepted")
//     );

//     try {
//       await updateBookingStatus(id, action);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update booking status.");
//       fetchBookings(); // rollback
//     }
//   };

//   if (loading) return <div className="loading">Loading bookings...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="worker-bookings-container">
//       <h2>My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No active bookings found.</p>
//       ) : (
//         <table className="bookings-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>User</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.user.username}</td>
//                 <td>{booking.date}</td>
//                 <td>
//                   <span className={`status-badge ${booking.status}`}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td>
//                   {booking.status === "pending" && (
//                     <>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="accept-btn"
//                         onClick={() => handleAction(booking.id, "accept")}
//                       >
//                         Accept
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="reject-btn"
//                         onClick={() => handleAction(booking.id, "reject")}
//                       >
//                         Reject
//                       </motion.button>
//                     </>
//                   )}
//                   {booking.status === "accepted" && (
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="complete-btn"
//                       onClick={() => handleAction(booking.id, "complete")}
//                     >
//                       Complete
//                     </motion.button>
//                   )}
//                 </td>
//                 <td>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="view-details-btn"
//                     onClick={() => setSelectedBooking(booking)}
//                   >
//                     <FiEye /> View
//                   </motion.button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Booking Details Modal */}
//       <AnimatePresence>
//         {selectedBooking && (
//           <motion.div
//             className="modal-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedBooking(null)}
//           >
//             <motion.div
//               className="modal-content booking-modal"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="modal-header">
//                 <h3>Booking #{selectedBooking.id} Details</h3>
//                 <FiX
//                   className="close-icon"
//                   onClick={() => setSelectedBooking(null)}
//                 />
//               </div>

//               <div className="modal-body">
//                 <div className="booking-info-grid">
//                   <div className="info-card">
//                     <strong>User:</strong> {selectedBooking.user.username}
//                   </div>
//                   <div className="info-card">
//                     <strong>Date:</strong> {selectedBooking.date}
//                   </div>
//                   <div className="info-card">
//                     <strong>Status:</strong>
//                     <span
//                       className={`status-badge ${selectedBooking.status}`}
//                     >
//                       {selectedBooking.status}
//                     </span>
//                   </div>
//                   <div className="info-card">
//                     <strong>Advance:</strong> ₹{selectedBooking.advance_amount}
//                   </div>
//                   <div className="info-card">
//                     <strong>Location:</strong> {selectedBooking.location}
//                   </div>
//                 </div>

//                 <div className="text-section">
//                   <p>
//                     <strong>Description:</strong>{" "}
//                     {selectedBooking.description}
//                   </p>
//                   <p>
//                     <strong>Notes:</strong> {selectedBooking.notes || "-"}
//                   </p>
//                 </div>

//                 {selectedBooking.payments?.length > 0 && (
//                   <div className="payments-section">
//                     <h4>Payments</h4>
//                     <ul>
//                       {selectedBooking.payments.map((p) => (
//                         <li key={p.id}>
//                           <strong>Amount:</strong> ₹{p.amount} |{" "}
//                           <strong>Status:</strong> {p.status} |{" "}
//                           <strong>Commission:</strong> ₹{p.commission}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className="images-section">
//                   <h4>Images</h4>
//                   <div className="images-grid">
//                     {selectedBooking.images?.length > 0 ? (
//                       selectedBooking.images.map((img, idx) => (
//                         <img
//                           key={idx}
//                           src={img.file}
//                           alt={`booking-${idx}`}
//                           onClick={() => setZoomImage(img.file)}
//                         />
//                       ))
//                     ) : (
//                       <p>No images available</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Zoomed Image Modal */}
//       <AnimatePresence>
//         {zoomImage && (
//           <motion.div
//             className="modal-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setZoomImage(null)}
//           >
//             <motion.div
//               className="modal-content image-zoom"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img src={zoomImage} alt="Zoomed" />
//               <FiX className="close-icon" onClick={() => setZoomImage(null)} />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWorkerBookings, updateBookingStatus, deleteBooking } from "../../api/api";
import { FiX, FiEye, FiTrash2 } from "react-icons/fi";
import "./styles/WorkerBookings.css";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function WorkerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [activeTab, setActiveTab] = useState("active"); // "active", "investigating", "completed"

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getWorkerBookings({ my_bookings: "worker" });
      const bookingsArray = Array.isArray(data) ? data : data.results || [];
      const formattedBookings = bookingsArray
        .map((b) => ({ ...b, date: formatDate(b.date) }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBookings(formattedBookings);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status:
                action === "complete"
                  ? "completed"
                  : action === "accept"
                  ? "accepted"
                  : "rejected",
            }
          : b
      )
    );

    try {
      await updateBookingStatus(id, action);
    } catch (err) {
      console.error(err);
      alert("Failed to update booking status.");
      fetchBookings(); // rollback
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking.");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "active") return b.status === "pending" || b.status === "accepted";
    if (activeTab === "investigating") return b.status === "no_show_reported" || b.status === "investigating";
    if (activeTab === "completed") return b.status === "completed";
    return false;
  });

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="worker-bookings-container">
      <h2>My Bookings</h2>

      {/* Tabs */}
      <div className="booking-tabs">
        <button className={activeTab === "active" ? "active" : ""} onClick={() => setActiveTab("active")}>
          Active
        </button>
        <button className={activeTab === "investigating" ? "active" : ""} onClick={() => setActiveTab("investigating")}>
          Investigating
        </button>
        <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>
          Completed
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings in this category.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user.username}</td>
                <td>{booking.date}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status === "no_show_reported"
                      ? "No Show Reported"
                      : booking.status === "investigating"
                      ? "Under Investigation"
                      : booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === "pending" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="accept-btn"
                        onClick={() => handleAction(booking.id, "accept")}
                      >
                        Accept
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="reject-btn"
                        onClick={() => handleAction(booking.id, "reject")}
                      >
                        Reject
                      </motion.button>
                    </>
                  )}
                  {booking.status === "accepted" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="complete-btn"
                      onClick={() => handleAction(booking.id, "complete")}
                    >
                      Complete
                    </motion.button>
                  )}
                  {booking.status === "completed" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="delete-btn"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <FiTrash2 /> Delete
                    </motion.button>
                  )}
                </td>
                <td>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="view-details-btn"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <FiEye /> View
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              className="modal-content booking-modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Booking #{selectedBooking.id} Details</h3>
                <FiX
                  className="close-icon"
                  onClick={() => setSelectedBooking(null)}
                />
              </div>

              <div className="modal-body">
                <div className="booking-info-grid">
                  <div className="info-card">
                    <strong>User:</strong> {selectedBooking.user.username}
                  </div>
                  <div className="info-card">
                    <strong>Date:</strong> {selectedBooking.date}
                  </div>
                  <div className="info-card">
                    <strong>Status:</strong>
                    <span className={`status-badge ${selectedBooking.status}`}>
                      {selectedBooking.status === "no_show_reported"
                        ? "No Show Reported"
                        : selectedBooking.status === "investigating"
                        ? "Under Investigation"
                        : selectedBooking.status}
                    </span>
                  </div>
                  <div className="info-card">
                    <strong>Advance:</strong> ₹{selectedBooking.advance_amount}
                  </div>
                  <div className="info-card">
                    <strong>Location:</strong> {selectedBooking.location}
                  </div>
                </div>

                <div className="text-section">
                  <p>
                    <strong>Description:</strong> {selectedBooking.description}
                  </p>
                  <p>
                    <strong>Notes:</strong> {selectedBooking.notes || "-"}
                  </p>
                </div>

                {selectedBooking.payments?.length > 0 && (
                  <div className="payments-section">
                    <h4>Payments</h4>
                    <ul>
                      {selectedBooking.payments.map((p) => (
                        <li key={p.id}>
                          <strong>Amount:</strong> ₹{p.amount} |{" "}
                          <strong>Status:</strong> {p.status} |{" "}
                          <strong>Commission:</strong> ₹{p.commission}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="images-section">
                  <h4>Images</h4>
                  <div className="images-grid">
                    {selectedBooking.images?.length > 0 ? (
                      selectedBooking.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.file}
                          alt={`booking-${idx}`}
                          onClick={() => setZoomImage(img.file)}
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              className="modal-content image-zoom"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={zoomImage} alt="Zoomed" />
              <FiX className="close-icon" onClick={() => setZoomImage(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
