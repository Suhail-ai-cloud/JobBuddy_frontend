// import React, { useEffect, useState } from "react";
// import {
//   getNotifications,
//   markNotificationRead,
//   deleteNotification,
// } from "../api/api";
// import { useNavigate } from "react-router-dom"; 
// import "./styles/Notifications.css";

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await getNotifications();
//       const notifArray = Array.isArray(res.results) ? res.results : [];
//       setNotifications(notifArray);
//     } catch (err) {
//       console.error("Failed to fetch notifications:", err);
//       alert("Failed to load notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkRead = async (id) => {
//     try {
//       await markNotificationRead(id);
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, read_status: true } : n))
//       );
//     } catch (err) {
//       console.error("Failed to mark notification as read:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteNotification(id);
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error("Failed to delete notification:", err);
//     }
//   };

//   // Navigate to worker review page
//   const goToReviewPage = (workerId, bookingId) => {
//     navigate(`/worker/${workerId}/reviews?booking=${bookingId}`);
//   };

//   if (loading) return <p>Loading notifications...</p>;
//   if (notifications.length === 0) return <p>No notifications yet!</p>;

//   return (
//     <div className="notifications-page">
//       <h2 className="notifications-title">Your Notifications</h2>
//       <ul className="notifications-list">
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className={`notification-card ${
//               notif.read_status ? "read" : "unread"
//             } slide-in`}
//           >
//             <div className="notification-content">
//               <p className="notification-message">{notif.message}</p>
//               <small className="notification-time">
//                 {new Date(notif.created_at).toLocaleString()}
//               </small>
//             </div>

//             <div className="notification-actions">
//               {notif.type === "review" && notif.booking_id && (
//                 <button
//                   className="notification-review-btn"
//                   onClick={() =>
//                     goToReviewPage(notif.worker_id, notif.booking_id)
//                   }
//                 >
//                   Add Review
//                 </button>
//               )}

//               {!notif.read_status && (
//                 <button
//                   className="notification-read-btn"
//                   onClick={() => handleMarkRead(notif.id)}
//                 >
//                   Mark as Read
//                 </button>
//               )}
//               <button
//                 className="notification-delete-btn"
//                 onClick={() => handleDelete(notif.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../api/api";
import { useNavigate } from "react-router-dom"; 
import { FiTrash2, FiCheck, FiStar } from "react-icons/fi";
import "./styles/Notifications.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      const notifArray = Array.isArray(res.results) ? res.results : [];
      setNotifications(notifArray);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      alert("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_status: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const goToReviewPage = (workerId, bookingId) => {
    navigate(`/worker/${workerId}/reviews?booking=${bookingId}`);
  };

  if (loading) return <p className="loading-text">Loading notifications...</p>;
  if (notifications.length === 0) return <p className="no-notifications">No notifications yet!</p>;

  return (
    <div className="notifications-page">
      <h2 className="notifications-title">Your Notifications</h2>
      <ul className="notifications-list">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`notification-card ${notif.read_status ? "read" : "unread"}`}
          >
            <div className="notification-content">
              <p className="notification-message">{notif.message}</p>
              <small className="notification-time">
                {new Date(notif.created_at).toLocaleString()}
              </small>
            </div>

            <div className="notification-actions">
              {notif.type === "review" && notif.booking_id && (
                <button
                  className="btn-review"
                  onClick={() => goToReviewPage(notif.worker_id, notif.booking_id)}
                >
                  <FiStar /> Add Review
                </button>
              )}

              {!notif.read_status && (
                <button
                  className="btn-mark-read"
                  onClick={() => handleMarkRead(notif.id)}
                >
                  <FiCheck /> Mark as Read
                </button>
              )}

              <button
                className="btn-delete"
                onClick={() => handleDelete(notif.id)}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
