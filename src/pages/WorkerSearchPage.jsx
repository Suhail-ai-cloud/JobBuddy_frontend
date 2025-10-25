
// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { useLocation } from "react-router-dom";
// import WorkerCard from "../components/WorkerCard";
// import { searchWorkers, API } from "../api/api";
// import { motion, AnimatePresence } from "framer-motion";
// import "./styles/WorkerSearchPage.css";

// export default function WorkerSearchPage() {
//   const locationHook = useLocation();
//   const params = new URLSearchParams(locationHook.search);
//   const initialQuery = params.get("q") || "";

//   const [workers, setWorkers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [query, setQuery] = useState(initialQuery);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [location, setLocation] = useState("");
//   const [sort, setSort] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await API.get("/categories/");
//         const options = res.data.results.map(cat => ({ value: cat.id, label: cat.name }));
//         setCategories(options);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch workers
//   useEffect(() => {
//     const fetchWorkers = async () => {
//       setLoading(true);
//       try {
//         const results = await searchWorkers({
//           q: query,
//           category: selectedCategory?.value,
//           location,
//           sort,
//         });
//         setWorkers(results);
//       } catch (err) {
//         console.error("Error fetching workers:", err);
//         setWorkers([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWorkers();
//   }, [query, selectedCategory, location, sort]);

//   // Placeholder loader cards
//   const loaderCards = Array.from({ length: 6 }, (_, i) => (
//     <motion.div
//       key={i}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3, delay: i * 0.05 }}
//       className="worker-placeholder-card"
//     />
//   ));

//   return (
//     <div className="worker-search-page">
//       {/* Hero Section */}
//       <section className="search-hero">
//         <h1>Find Professionals Instantly</h1>
//         <p>Browse verified workers by skills, location, category, and rating</p>
//       </section>

//       {/* Filters */}
//       <div className="search-filters">
//         <input
//           type="text"
//           placeholder="Search skills or name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <Select
//           options={categories}
//           placeholder="Select Category"
//           value={selectedCategory}
//           onChange={setSelectedCategory}
//           isClearable
//           classNamePrefix="react-select"
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="">Sort by</option>
//           <option value="rating">Rating</option>
//           <option value="total_jobs">Total Jobs</option>
//         </select>
//       </div>

//       {/* Results */}
//       <div className="worker-grid">
//         {loading ? (
//           <AnimatePresence>{loaderCards}</AnimatePresence>
//         ) : workers.length === 0 ? (
//           <div className="empty-state">
//             <img src="/assets/no-workers.svg" alt="No workers" />
//             <p>No workers found.</p>
//           </div>
//         ) : (
//           <AnimatePresence>
//             {workers.map((worker, index) => (
//               <motion.div
//                 key={worker.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//               >
//                 <WorkerCard worker={worker} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import WorkerCard from "../components/WorkerCard";
import { searchWorkers, API } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/WorkerSearchPage.css";

export default function WorkerSearchPage() {
  const locationHook = useLocation();
  const params = new URLSearchParams(locationHook.search);
  const initialQuery = params.get("q") || "";

  const [workers, setWorkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories/");
        const options = res.data.results.map(cat => ({ value: cat.id, label: cat.name }));
        setCategories(options);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch workers
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const results = await searchWorkers({
          q: query,
          category: selectedCategory?.value,
          location,
          sort,
        });
        setWorkers(results);
      } catch (err) {
        console.error("Error fetching workers:", err);
        setWorkers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, [query, selectedCategory, location, sort]);

  // Placeholder loader cards
  const loaderCards = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}
      className="worker-placeholder-card"
    />
  ));

  return (
    <div className="worker-search-page">
      {/* Hero Section */}
      <section className="search-hero">
        <h1>Find Professionals Instantly</h1>
        <p>Browse verified workers by skills, location, category, and rating</p>
      </section>

      {/* Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search skills or name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          options={categories}
          placeholder="Select Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          isClearable
          classNamePrefix="react-select"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="rating">Rating</option>
          <option value="total_jobs">Total Jobs</option>
        </select>
      </div>

      {/* Worker Grid */}
      <div className="worker-grid">
        {loading ? (
          <AnimatePresence>{loaderCards}</AnimatePresence>
        ) : workers.length === 0 ? (
          <div className="empty-state">
            <img src="/assets/no-workers.svg" alt="No workers" />
            <p>No workers found.</p>
          </div>
        ) : (
          <AnimatePresence>
            {workers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <WorkerCard worker={worker} />
              </motion.div>
            ))}
            {/* Add blank div for layout consistency if odd number of workers */}
            {workers.length % 2 !== 0 && <div className="worker-grid-placeholder" />}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
