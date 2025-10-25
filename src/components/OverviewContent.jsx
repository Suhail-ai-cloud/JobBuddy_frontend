import React from "react";
import { motion } from "framer-motion";

export default function OverviewContent() {
  return (
    <motion.div
      className="overview-content"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <section className="overview-section">
        <h2>Welcome to Your Space</h2>
        <p>
          Manage your profile, check your wallet, view your bookings, and explore new
          opportunities — all in one clean and modern space.
        </p>
      </section>

      <div className="overview-cards">
        <motion.div
          className="overview-card"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Profile</h3>
          <p>Update your personal details and preferences.</p>
        </motion.div>

        <motion.div
          className="overview-card"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Wallet</h3>
          <p>Track your earnings and transactions easily.</p>
        </motion.div>

        <motion.div
          className="overview-card"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Bookings</h3>
          <p>Manage upcoming, ongoing, and past bookings.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
