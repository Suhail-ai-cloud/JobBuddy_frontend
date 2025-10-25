import React, { Suspense } from "react";
import { motion } from "framer-motion";
import "./styles/Overview.css";

// Lazy load components
const OverviewContent = React.lazy(() => import("./OverviewContent"));

export default function Overview() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <motion.div
        className="overview-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="overview-title">My Space</h1>
        <OverviewContent />
      </motion.div>
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="loading-title">JobBuddy</h1>
        <div className="loading-spinner"></div>
      </motion.div>
    </div>
  );
}
