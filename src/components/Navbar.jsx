
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import { UserContext } from "../context/UserContext";
import "./styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  };

  const getProfileImage = () => {
    if (!user?.profile_image) return "https://via.placeholder.com/40";
    if (user.profile_image.startsWith("http")) return user.profile_image;
    return `${API.defaults.baseURL.replace(/\/api$/, "")}${user.profile_image}`;
  };

  return (
    <nav className={`navbar ${visible ? "visible" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">JobBuddy</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/workers/search" className="nav-link" onClick={() => setMenuOpen(false)}>Workers</Link>

        {user ? (
          <>
            <Link to="/payments" className="nav-link" onClick={() => setMenuOpen(false)}>Wallet</Link>
            <Link to="/notifications" className="nav-link" onClick={() => setMenuOpen(false)}>Notifications</Link>

            <div className="nav-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={getProfileImage()} alt={user.username} className="profile-avatar" />
              <span className="profile-name">{user.first_name || user.username}</span>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  {user.worker_profile && <Link to="/dashboard" className="dropdown-item">My Space</Link>}
                  <div className="dropdown-item logout" onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="nav-link login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
}
