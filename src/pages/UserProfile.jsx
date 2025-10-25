
import React, { useEffect, useState } from "react";
import { getCurrentUser, getWorkerBookings, getWorkerCompletedBookings, API } from "../api/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MEDIA_BASE } from "../api/api";
import BookingList from "../components/BookingList";
import { FiCamera, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./styles/WorkerProfile.css";

export default function WorkerProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null);

const resolveProfileImage = (url) => {
  if (!url) return "https://via.placeholder.com/200x200?text=No+Image";
  return url.startsWith("http") ? url : `${MEDIA_BASE}${url}`;
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser({
          ...userData,
          profile_image: resolveProfileImage(userData.profile_image),
        });
        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
        });

        const activeBookings = await getWorkerBookings();
        const completedBookings = await getWorkerCompletedBookings(userData.worker_profile?.id);

        setBookings(Array.isArray(activeBookings) ? activeBookings : activeBookings?.results || []);
        setHistory(Array.isArray(completedBookings) ? completedBookings : completedBookings?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleProfileImageChange = async (file) => {
  if (!file) return;
  setProfileImageFile(file);

  const formDataImg = new FormData();
  formDataImg.append("profile_image", file);

  try {
    const res = await API.post("/users/update-profile-image/", formDataImg, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Append cache-buster
    const newImageUrl = resolveProfileImage(res.data.profile_image);
    setUser((prev) => ({ ...prev, profile_image: newImageUrl }));
  } catch (err) {
    console.error(err);
  }
};


  const handleSave = async () => {
    try {
      await API.patch("/users/me/update/", formData);
      const userData = await getCurrentUser();
      setUser({ ...userData, profile_image: resolveProfileImage(userData.profile_image) });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;
  if (!user) return <p className="loading-text">User not found.</p>;

  return (
    <div className="profile-page">
      {/* Header */}
      <motion.header className="profile-header" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <h1>Worker Profile</h1>
        <nav>
          <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>Info</button>
          <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>Bookings</button>
          <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>History</button>
        </nav>
      </motion.header>

      {/* Profile Hero */}
      <motion.section className="profile-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="profile-image-wrapper">
          <img src={user.profile_image} alt={user.username} className="profile-img" />
          <label htmlFor="profileUpload" className="profile-upload-label">
            <FiCamera size={24} color="#fff" />
            <input
              type="file"
              id="profileUpload"
              hidden
              onChange={(e) => handleProfileImageChange(e.target.files[0])}
            />
          </label>
        </div>

        <div className="profile-form">
          <div className="input-group"><FiUser /><input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder="First Name" /></div>
          <div className="input-group"><FiUser /><input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder="Last Name" /></div>
          <div className="input-group"><FiMail /><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" /></div>
          <div className="input-group"><FiPhone /><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" /></div>
          <div className="input-group"><FiMapPin /><input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" /></div>

          <button className="btn-save" onClick={handleSave}>Save Changes</button>
          {!user.worker_profile && <button className="btn-become-worker" onClick={() => navigate("/become-worker")}>Become a Worker</button>}
        </div>
      </motion.section>

      {/* Tab Content */}
      <motion.section className="profile-tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {activeTab === "info" && (
          <motion.div className="info-cards-grid" layout>
            <div className="info-card">
              <h3>Name</h3>
              <p>{user.first_name} {user.last_name}</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            <div className="info-card">
              <h3>Phone</h3>
              <p>{user.phone || "N/A"}</p>
            </div>
            <div className="info-card">
              <h3>Location</h3>
              <p>{user.location || "N/A"}</p>
            </div>
          </motion.div>
        )}

        {activeTab === "bookings" && <BookingList bookings={bookings} setBookings={setBookings} />}
        {activeTab === "history" && (
          <motion.div className="history-cards-grid" layout>
            {history.length > 0 ? history.map(b => (
              <div className="history-card" key={b.id}>
                <h4>Booking #{b.id}</h4>
                <p><strong>User:</strong> {b.user}</p>
                <p><strong>Worker:</strong> {b.worker}</p>
                <p><strong>Status:</strong> {b.status}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Advance Paid:</strong> {b.payments?.filter(p => p.status==="completed").reduce((sum,p)=>sum+Number(p.amount),0)||0} INR</p>
                <p><strong>Total:</strong> {Number(b.balance_amount||0)+ (b.payments?.filter(p => p.status==="completed").reduce((sum,p)=>sum+Number(p.amount),0)||0)} INR</p>
              </div>
            )) : <p>No completed bookings.</p>}
          </motion.div>
        )}
      </motion.section>

      <motion.footer className="profile-footer" initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <p>&copy; 2025 Worker Profile. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
