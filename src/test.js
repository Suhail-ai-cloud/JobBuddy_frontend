import React, { useState, useContext } from "react";
import axios from "axios";
import { API } from "../api/api";
import { UserContext } from "../context/UserContext";

export default function BecomeWorker() {
  const { fetchUser } = useContext(UserContext);
  const [skills, setSkills] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [availability, setAvailability] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  React.useEffect(() => {
    API.get("/categories/")
      .then(res => setAllCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const res = await axios.post(
        `${API.defaults.baseURL}/become-worker/`,
        { skills, daily_rate: dailyRate, availability, categories },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      alert(res.data.message);
      await fetchUser(); // ✅ refresh user context to update navbar
      window.location.href = "/worker-dashboard";

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to become a worker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="become-worker-container">
      <h2>Become a Worker</h2>
      <form onSubmit={handleSubmit} className="worker-form">
        <div>
          <label>Skills:</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Describe your skills..."
            required
          />
        </div>

        <div>
          <label>Daily Rate:</label>
          <input
            type="number"
            value={dailyRate}
            onChange={(e) => setDailyRate(e.target.value)}
            placeholder="Enter your daily rate"
            min="0"
            required
          />
        </div>

        <div>
          <label>Availability:</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === "true")}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div>
          <label>Categories:</label>
          <select
            multiple
            value={categories}
            onChange={(e) =>
              setCategories(Array.from(e.target.selectedOptions, option => option.value))
            }
          >
            {allCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Become a Worker"}
        </button>
      </form>
    </div>
  );
}
