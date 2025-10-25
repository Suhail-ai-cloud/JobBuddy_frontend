
// import React, { useState, useEffect, Suspense, lazy } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import "./styles/WorkerDashboard.css";

// // Lazy load all dashboard pages
// const WorkerOverview = lazy(() => import("./dashboard/WorkerOverview"));
// const WorkerAvailability = lazy(() => import("./dashboard/WorkerAvailability"));
// const WorkerBookings = lazy(() => import("./dashboard/WorkerBookings"));
// const WorkerPortfolio = lazy(() => import("./dashboard/WorkerPortfolio"));
// const WorkerReviews = lazy(() => import("./dashboard/WorkerReviews"));
// const WorkerEarnings = lazy(() => import("./dashboard/WorkerEarnings"));
// const WorkerSettings = lazy(() => import("./dashboard/WorkerSettings"));
// const WorkerVerification = lazy(() => import("./dashboard/WorkerVerification"));

// export default function WorkerDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
//   const [pageLoaded, setPageLoaded] = useState(false);

//   // Simulate initial app load
//   useEffect(() => {
//     const timer = setTimeout(() => setPageLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const renderTab = () => {
//     switch (activeTab) {
//       case "availability":
//         return <WorkerAvailability />;
//       case "bookings":
//         return <WorkerBookings />;
//       case "portfolio":
//         return <WorkerPortfolio />;
//       case "reviews":
//         return <WorkerReviews />;
//       case "verification":
//         return <WorkerVerification />;

//       case "earnings":
//         return <WorkerEarnings />;
//       case "settings":
//         return <WorkerSettings />;

//       default:
//       case "overview":
//         return <WorkerOverview />;
//     }
//   };

//   // Sidebar responsive toggle
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) setSidebarOpen(false);
//       else setSidebarOpen(true);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!pageLoaded) {
//     return (
//       <div className="initial-loader">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="worker-dashboard">
//       {/* Sidebar */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.aside
//             className="sidebar"
//             initial={{ x: -250, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -250, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h2 className="logo">Work<span>Hub</span></h2>
//             <ul>
//               <li onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? "active" : ""}>Overview</li>
//               <li onClick={() => setActiveTab("availability")} className={activeTab === "availability" ? "active" : ""}>Availability</li>
//               <li onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>Bookings</li>
//               <li onClick={() => setActiveTab("portfolio")} className={activeTab === "portfolio" ? "active" : ""}>Portfolio</li>
//               <li onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>Reviews</li>
//               <li onClick={() => setActiveTab("earnings")} className={activeTab === "earnings" ? "active" : ""}>Earnings</li>
//               <li onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>Settings</li>
//               <li onClick={() => setActiveTab("verification")} className={activeTab === "verification" ? "active" : ""}>
//                 Verification
//               </li>
//             </ul>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Sidebar Toggle Button */}
//       <button className="sidebar-toggle" onClick={() => setSidebarOpen((prev) => !prev)}>
//         {sidebarOpen ? <FiArrowLeft /> : <FiArrowRight />}
//       </button>

//       {/* Main Content */}
//       <motion.main
//         className={`content ${sidebarOpen ? "" : "full-width"}`}
//         initial={{ opacity: 0, x: 25 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Suspense fallback={<SkeletonLoader />}>
//           {renderTab()}
//         </Suspense>
//       </motion.main>
//     </div>
//   );
// }

// // 💀 Skeleton shimmer loader (used during lazy load)
// function SkeletonLoader() {
//   return (
//     <div className="skeleton-container">
//       <div className="skeleton-header shimmer"></div>
//       <div className="skeleton-grid">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="skeleton-card shimmer"></div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "./styles/WorkerDashboard.css";

// Lazy load all dashboard pages
const WorkerOverview = lazy(() => import("./dashboard/WorkerOverview"));
const WorkerAvailability = lazy(() => import("./dashboard/WorkerAvailability"));
const WorkerBookings = lazy(() => import("./dashboard/WorkerBookings"));
const WorkerPortfolio = lazy(() => import("./dashboard/WorkerPortfolio"));
const WorkerReviews = lazy(() => import("./dashboard/WorkerReviews"));
const WorkerEarnings = lazy(() => import("./dashboard/WorkerEarnings"));
const WorkerSettings = lazy(() => import("./dashboard/WorkerSettings"));
const WorkerVerification = lazy(() => import("./dashboard/WorkerVerification"));

// 🆕 New tab: Support system
const WorkerSupport = lazy(() => import("./dashboard/WorkerSupport"));

export default function WorkerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Simulate initial app load
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "availability":
        return <WorkerAvailability />;
      case "bookings":
        return <WorkerBookings />;
      case "portfolio":
        return <WorkerPortfolio />;
      case "reviews":
        return <WorkerReviews />;
      case "verification":
        return <WorkerVerification />;
      case "earnings":
        return <WorkerEarnings />;
      case "settings":
        return <WorkerSettings />;

      // 🆕 Support Page Rendering
      case "support":
        return <WorkerSupport />;

      default:
      case "overview":
        return <WorkerOverview />;
    }
  };

  // Sidebar responsive toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!pageLoaded) {
    return (
      <div className="initial-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="worker-dashboard">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="logo">
              Work<span>Hub</span>
            </h2>
            <ul>
              <li onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? "active" : ""}>Overview</li>
              <li onClick={() => setActiveTab("availability")} className={activeTab === "availability" ? "active" : ""}>Availability</li>
              <li onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>Bookings</li>
              <li onClick={() => setActiveTab("portfolio")} className={activeTab === "portfolio" ? "active" : ""}>Portfolio</li>
              <li onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>Reviews</li>
              <li onClick={() => setActiveTab("earnings")} className={activeTab === "earnings" ? "active" : ""}>Earnings</li>
              <li onClick={() => setActiveTab("verification")} className={activeTab === "verification" ? "active" : ""}>Verification</li>
              <li onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>Settings</li>

              {/* 🆕 New Support tab */}
              <li onClick={() => setActiveTab("support")} className={activeTab === "support" ? "active" : ""}>Support</li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen((prev) => !prev)}>
        {sidebarOpen ? <FiArrowLeft /> : <FiArrowRight />}
      </button>

      {/* Main Content */}
      <motion.main
        className={`content ${sidebarOpen ? "" : "full-width"}`}
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Suspense fallback={<SkeletonLoader />}>{renderTab()}</Suspense>
      </motion.main>
    </div>
  );
}

// 💀 Skeleton shimmer loader (used during lazy load)
function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header shimmer"></div>
      <div className="skeleton-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card shimmer"></div>
        ))}
      </div>
    </div>
  );
}
