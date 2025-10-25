import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTools,
  FaHandshake,
  FaUserTie,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import "./styles/Home.css";
// import AuthContext if you handle login state
// import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext); // optional if using login state

  return (
    <div className="landing-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find Trusted Workers Near You
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          From plumbers to electricians — hire verified professionals in seconds.
        </motion.p>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="hero-btn" onClick={() => navigate("/workers/search")}>
            Explore Workers
          </button>
        </motion.div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories">
        {[
          { icon: <FaTools />, title: "Find Local Experts", text: "Discover trusted professionals nearby for any service." },
          { icon: <FaHandshake />, title: "Book Instantly", text: "Check availability and book in a few clicks." },
          { icon: <FaUserTie />, title: "Verified & Rated", text: "All workers are background-checked and rated by users." },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="category-card"
            whileInView={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="cat-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {[
            { icon: <FaMapMarkedAlt />, title: "Search", desc: "Choose your location & service type." },
            { icon: <FaUserTie />, title: "Select", desc: "Compare profiles, ratings, and skills." },
            { icon: <FaMoneyBillWave />, title: "Book & Pay", desc: "Book your worker and pay securely online." },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="step-card"
              whileInView={{ opacity: [0, 1], y: [30, 0] }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
            >
              <div className="step-icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-cards">
          {[
            { name: "Akhil", text: "Found a great plumber within minutes. Super easy booking!" },
            { name: "Meera", text: "I listed as a cleaner and started getting jobs instantly." },
            { name: "Raj", text: "Payment system is smooth and support is quick. Loved it!" },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
              transition={{ duration: 0.6 }}
            >
              <FaStar className="star" />
              <p>"{t.text}"</p>
              <h5>- {t.name}</h5>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about">
        <motion.div
          className="about-text"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Why Choose JobBuddy?</h2>
          <p>
            JobBuddy helps you connect with verified professionals around you — safely, quickly, and affordably. 
            Whether you're new in town or just need quick help, our platform makes finding trusted help effortless.
          </p>
          <button className="learn-btn" onClick={() => navigate("/workers/search")}>Learn More</button>
        </motion.div>

        <motion.div
          className="about-image"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="about"
          />
        </motion.div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="stats">
        {[
          { num: "150+", text: "Active Locations" },
          { num: "3,000+", text: "Registered Workers" },
          { num: "20+", text: "Job Categories" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            whileInView={{ opacity: [0, 1], y: [40, 0] }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <h2>{s.num}</h2>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Join Our Growing Community</h2>
        <p>Whether you want to find work or hire experts — JobBuddy is for everyone.</p>
        <div className="cta-buttons">
          <button className="cta-btn explore" onClick={() => navigate("/workers/search")}>
            Explore Workers
          </button>
        </div>
      </section>
    </div>
  );
}
