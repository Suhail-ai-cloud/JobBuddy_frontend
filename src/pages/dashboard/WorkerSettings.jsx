
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { API, MEDIA_BASE, getCurrentUser } from "../../api/api";
import { motion } from "framer-motion";
import "./styles/WorkerSettings.css";

export default function WorkerSettings() {
  const [workerData, setWorkerData] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

const resolveProfileImage = (url) => {
  if (!url) return "https://via.placeholder.com/150";
  return url.startsWith("http") ? url : `${MEDIA_BASE}${url}`;
};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories/");
        const options = res.data.results.map((c) => ({
          value: c.id,
          label: c.name,
        }));
        setAllCategories(options);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const data = await getCurrentUser();
        const categories =
          data.worker_profile?.categories?.map((catId) => {
            const match = allCategories.find((c) => c.value === catId);
            return match || { value: catId, label: `Category ${catId}` };
          }) || [];

        if (data.worker_profile) {
          setWorkerData({
            ...data.worker_profile,
            ...data,
            id: data.worker_profile.id,
            categories,
            daily_rate: data.worker_profile.daily_rate || 0,
            profile_image: resolveProfileImage(data.profile_image),
          });
          setPreviewImage(resolveProfileImage(data.profile_image));
        } else {
          setWorkerData({
            ...data,
            id: null,
            skills: "",
            availability: false,
            verified: false,
            daily_rate: 0,
            categories: [],
            profile_image: null,
          });
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
        setWorkerData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [allCategories]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setWorkerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setWorkerData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setWorkerData((prev) => ({ ...prev, categories: selectedOptions }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profile_image", file);
      const res = await API.post("/users/update-profile-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newImageUrl = resolveProfileImage(res.data.profile_image);
      setPreviewImage(newImageUrl);
      setWorkerData((prev) => ({ ...prev, profile_image: newImageUrl }));
      alert("Profile image updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile image.");
    }
  };

  const handleSave = async () => {
    if (!workerData) return;
    setSaving(true);

    try {
      const userPayload = {
        first_name: workerData.first_name,
        last_name: workerData.last_name,
        email: workerData.email,
        phone: workerData.phone,
        location: workerData.location,
      };
      await API.patch("/users/me/update/", userPayload);

      if (workerData.id) {
        const workerPayload = {
          skills: workerData.skills,
          availability: workerData.availability,
          verified: workerData.verified,
          daily_rate: Number(workerData.daily_rate) || 0,
          categories: workerData.categories?.map((c) => c.value) || [],
        };
        await API.patch(`/worker-profiles/${workerData.id}/`, workerPayload);
      }

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading-text">Loading worker data...</p>;
  if (!workerData) return <p className="loading-text">Worker not found.</p>;

  return (
    <motion.div
      className="worker-settings-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Worker Settings</h1>

      {/* Profile Image */}
      <div className="profile-image-section">
        {previewImage && <img src={previewImage} alt="Profile" className="profile-img" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* Basic Info */}
      <div className="settings-section">
        <h2>Basic Info</h2>
        <div className="settings-grid">
          <label>
            First Name
            <input type="text" name="first_name" value={workerData.first_name || ""} onChange={handleFieldChange} />
          </label>
          <label>
            Last Name
            <input type="text" name="last_name" value={workerData.last_name || ""} onChange={handleFieldChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={workerData.email || ""} onChange={handleFieldChange} />
          </label>
          <label>
            Phone
            <input type="text" name="phone" value={workerData.phone || ""} onChange={handleFieldChange} />
          </label>
          <label>
            Location
            <input type="text" name="location" value={workerData.location || ""} onChange={handleFieldChange} />
          </label>
        </div>
      </div>

      {/* Professional Info */}
      <div className="settings-section">
        <h2>Professional Info</h2>
        <div className="settings-grid">
          <label>
            Skills
            <input type="text" name="skills" value={workerData.skills || ""} onChange={handleFieldChange} />
          </label>
          <label>
            Daily Rate (INR)
            <input type="number" name="daily_rate" value={workerData.daily_rate || 0} onChange={handleFieldChange} />
          </label>
          <label className="checkbox-label">
            Availability
            <input type="checkbox" name="availability" checked={workerData.availability || false} onChange={handleCheckboxChange} />
          </label>
          <label>
            Categories
            <Select
              isMulti
              options={allCategories}
              value={workerData.categories || []}
              onChange={handleCategoryChange}
              classNamePrefix="react-select"
            />
          </label>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </motion.div>
  );
}
