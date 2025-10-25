// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import "./styles/LandingPage.css";

// // Skeleton Loader
// const Skeleton = ({ className }) => <div className={`skeleton ${className}`}></div>;

// export default function LandingPage() {
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   // Replace these paths with your downloaded SVGs
// const heroFloatingIcons = [
//   { src: "/svgs/hammer.svg", style: { top: "10%", left: "5%" } },
//   { src: "/svgs/wrench.svg", style: { top: "20%", right: "10%" } },
//   { src: "/svgs/bulb.svg", style: { bottom: "10%", left: "40%" } }
// ];
//   const categoryCards = [
//     { name: "", svg: "/svgs/plumber.svg", style: { left: "50%", top: "90%" } },
//     { name: "", svg: "/svgs/electrician.svg", style: { right: "20%", top: "50%" } },
//     { name: "", svg: "/svgs/carpenter.svg", style: { left: "50%", bottom: "14%" } }
//   ];

//   return (
//     <div className={`landing-page ${darkMode ? "dark" : "light"}`}>
//       {/* Dark/Light Toggle */}
      

//       {/* --- Hero Section --- */}
//       <section className="hero-section">
//         <motion.h1
//           initial={{ y: -80, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           Find Trusted Workers Instantly
//         </motion.h1>
//         <motion.p
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Search across skills, services, and locations.
//         </motion.p>

//         {loading ? (
//           <Skeleton className="hero-search" />
//         ) : (
//           <motion.div
//             className="search-bar"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <input type="text" placeholder="Search workers, skills..." />
//           </motion.div>
//         )}

//         {/* Floating Hero SVG Icons */}
// {heroFloatingIcons.map((icon, idx) => (
//   <motion.img
//     key={idx}
//     src={icon.src}
//     className={`floating-icons icon-${idx}`}
//     style={icon.style}  // <-- apply position dynamically
//     alt="floating icon"
//     animate={{ y: [0, -15, 0, 10, 0], rotate: [0, 10, -10, 0] }}
//     transition={{ repeat: Infinity, duration: 4 + idx }}
//   />
// ))}
//       </section>

//       {/* --- Stats Section --- */}
//       <section className="stats-section">
//         <motion.h2
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           Trusted by Hundreds Across Cities
//         </motion.h2>

//         {loading ? (
//           <div className="stats-skeleton">
//             <Skeleton className="stat-card" />
//             <Skeleton className="stat-card" />
//             <Skeleton className="stat-card" />
//           </div>
//         ) : (
//           <div className="stats-cards">
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="stat-card"
//             >
//               100+ Verified Workers
//             </motion.div>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="stat-card"
//             >
//               20+ Cities Covered
//             </motion.div>
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="stat-card"
//             >
//               500+ Jobs Completed
//             </motion.div>
//           </div>
//         )}
//       </section>

// {/* --- How It Works Section --- */}
// <section className="how-section">
//   <motion.div
//     className="how-content"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8 }}
//   >
//     {/* Text Side */}
//     <div className="how-text">
//       <motion.h2
//         initial={{ opacity: 0, x: -30 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         How JobBuddy Works
//       </motion.h2>
//       <motion.p
//         initial={{ opacity: 0, x: -30 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         Find trusted workers in your city instantly. Search across skills, services, and locations,
//         view top-rated workers, and book them in just a few clicks.
//       </motion.p>
//     </div>

//     {/* Image Side */}
//     <motion.div
//       className="how-image"
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       {loading ? (
//         <Skeleton className="desktop-skeleton" />
//       ) : (
//         <img src="/svgs/desktop-mockup.png" alt="Desktop Mockup" />
//       )}

//       {/* Floating Category Cards */}
//       {/* {categoryCards.map((card, idx) => (
//         <motion.div
//           key={idx}
//           className="category-card"
//           style={card.style}
//           animate={{ y: [0, -10 + idx * 2, 0, 10 - idx * 2, 0], rotate: [0, 5, -5, 0] }}
//           transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
//         >
//           <img src={card.svg} alt={card.name} />
//           <p>{card.name}</p>
//         </motion.div>
//       ))} */}
//     </motion.div>
//   </motion.div>
// </section>



//       {/* --- Features / SVG Showcase Section --- */}
//     <section className="features-section">
//   <div className="features-container">
//     {/* Main Image on the Left */}
//     <motion.div
//       className="main-svg"
//       initial={{ scale: 0.8, opacity: 0 }}
//       whileInView={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <img src="/svgs/main.png" alt="Main Illustration" />
//     </motion.div>

//     {/* Text Section on the Right */}
//     <div className="how-text">
//       <motion.h2
//         initial={{ x: 30, opacity: 0 }}
//         whileInView={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         Explore JobBuddy Features
//       </motion.h2>
//       <motion.p
//         initial={{ x: 30, opacity: 0 }}
//         whileInView={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         Discover a wide range of services and trusted workers in your city. 
//         Easily browse categories, view top-rated professionals, and book services instantly.
//       </motion.p>
//     </div>

//     {/* Floating Feature Cards */}
//     {/* {categoryCards.map((card, idx) => (
//       <motion.div
//         key={idx}
//         className="feature-card"
//         style={card.style} // Example: { top: '10%', left: '20%' }
//         animate={{ y: [0, -10 + idx * 2, 0, 10 - idx * 5, 0], rotate: [0, 5, -5, 0] }}
//         transition={{ repeat: Infinity, duration: 4, delay: idx * 0.3 }}
//       >
//         <img src={card.svg} alt={card.name} />
//         <p>{card.name}</p>
//       </motion.div>
//     ))} */}
//   </div>
// </section>

      
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./styles/LandingPage.css";

// Skeleton Loader
const Skeleton = ({ className }) => <div className={`skeleton ${className}`}></div>;

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch all workers for search suggestions
  useEffect(() => {
    async function fetchWorkers() {
      try {
        const data = await fetch("/api/workers/").then(res => res.json());
        setWorkers(data.results || []);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      }
    }
    fetchWorkers();
  }, []);

  // Suggestions based on name, skills, location
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const uniqueSuggestions = [
      ...new Set(
        workers.flatMap(worker => [
          `${worker.user.first_name} ${worker.user.last_name}`,
          ...(worker.skills ? worker.skills.split(",") : []),
          worker.user.location
        ])
      )
    ];
    setSuggestions(uniqueSuggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 5));
    setShowSuggestions(true);
  }, [search, workers]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleSearchSubmit = (value) => {
    if (!value) return;
    setShowSuggestions(false);
    navigate(`/workers/search?q=${encodeURIComponent(value)}`);
  };
  const handleClearSearch = () => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    searchRef.current.focus();
  };

  const heroFloatingIcons = [
    { src: "/svgs/hammer.svg", style: { top: "10%", left: "5%" } },
    { src: "/svgs/wrench.svg", style: { top: "20%", right: "10%" } },
    { src: "/svgs/bulb.svg", style: { bottom: "10%", left: "40%" } }
  ];

  const categoryCards = [
    { name: "", svg: "/svgs/plumber.svg", style: { left: "50%", top: "90%" } },
    { name: "", svg: "/svgs/electrician.svg", style: { right: "20%", top: "50%" } },
    { name: "", svg: "/svgs/carpenter.svg", style: { left: "50%", bottom: "14%" } }
  ];

  return (
    <div className={`landing-page ${darkMode ? "dark" : "light"}`}>
      {/* Dark/Light Toggle */}
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* --- Hero Section with Search --- */}
      <section className="hero-section">
        <motion.h1 initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          Find Trusted Workers Instantly
        </motion.h1>
        <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          Search across skills, services, and locations.
        </motion.p>

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search workers by name, skill or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(search)}
            className="search-bar"
            ref={searchRef}
          />
          {search && <button className="clear-btn" onClick={handleClearSearch}>×</button>}

          {showSuggestions && suggestions.length > 0 && (
            <ul className={`suggestions-list ${showSuggestions ? "show" : ""}`}>
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => handleSearchSubmit(s)}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Floating Hero Icons */}
        {heroFloatingIcons.map((icon, idx) => (
          <motion.img
            key={idx}
            src={icon.src}
            className={`floating-icons icon-${idx}`}
            style={icon.style}
            alt="floating icon"
            animate={{ y: [0, -15, 0, 10, 0], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 + idx }}
          />
        ))}
      </section>

      {/* --- Stats Section --- */}
      <section className="stats-section">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          Trusted by Hundreds Across Cities
        </motion.h2>

        {loading ? (
          <div className="stats-skeleton">
            <Skeleton className="stat-card" />
            <Skeleton className="stat-card" />
            <Skeleton className="stat-card" />
          </div>
        ) : (
          <div className="stats-cards">
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="stat-card">100+ Verified Workers</motion.div>
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="stat-card">20+ Cities Covered</motion.div>
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="stat-card">500+ Jobs Completed</motion.div>
          </div>
        )}
      </section>

      {/* --- How It Works Section --- */}
      <section className="how-section">
        <motion.div className="how-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="how-text">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>How JobBuddy Works</motion.h2>
            <motion.p initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Find trusted workers in your city instantly. Search across skills, services, and locations, view top-rated workers, and book them in just a few clicks.
            </motion.p>
          </div>
          <motion.div className="how-image" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {loading ? <Skeleton className="desktop-skeleton" /> : <img src="/svgs/desktop-mockup.png" alt="Desktop Mockup" />}
          </motion.div>
        </motion.div>
      </section>

      {/* --- Features Section with Main Image and Text --- */}
      <section className="features-section">
        <div className="features-container">
          <motion.div className="main-svg" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
            <img src="/svgs/main.png" alt="Main Illustration" />
          </motion.div>
          <div className="how-text">
            <motion.h2 initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>Explore JobBuddy Features</motion.h2>
            <motion.p initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Discover a wide range of services and trusted workers in your city. Easily browse categories, view top-rated professionals, and book services instantly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- Workers Section (placeholder) --- */}
      <section className="workers-section">
        <h2>Available Workers</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="worker-list">
            {workers.length > 0 ? (
              workers.map(worker => (
                <div key={worker.id} className="worker-card-placeholder">
                  {worker.user.first_name} {worker.user.last_name} — {worker.skills}
                </div>
              ))
            ) : (
              <p>No workers found.</p>
            )}
          </div>
        )}
      </section>

    </div>
  );
}
