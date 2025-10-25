import React, { useState } from "react";
import { API, getCurrentUser } from "../api/api";

export default function UpdateProfileImage({ onUpdate }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");
    const formData = new FormData();
    formData.append("profile_image", image);

    setLoading(true);
    try {
      const res = await API.post("/users/update-profile-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile image updated!");
      if (onUpdate) onUpdate(res.data.profile_image); // update parent state
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-image-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
