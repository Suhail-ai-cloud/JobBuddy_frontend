// // import React, { useEffect, useState } from "react";
// // import {
// //   getCurrentUser,
// // } from "../../api/api";

// // import {
// //   getWorkerPortfolio,
// //   createPortfolio,
// //   updatePortfolio,
// //   deletePortfolio,
// //   addPortfolioMedia,
// //   deletePortfolioMedia,
// //   getWorkerComments,
// // } from "../../api/workerPortfolioApi"; 
// // import "./styles/WorkerPortfolio.css";

// // export default function WorkerPortfolioDashboard() {
// //   const [user, setUser] = useState(null);
// //   const [portfolios, setPortfolios] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [showForm, setShowForm] = useState(false);
// //   const [editingPortfolio, setEditingPortfolio] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     mediaFiles: [],
// //     previews: []
// //   });

// //   const [commentsPopup, setCommentsPopup] = useState(false);
// //   const [comments, setComments] = useState([]);

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const userData = await getCurrentUser();
// //         if (!userData?.id) throw new Error("User not found");
// //         setUser(userData);

// //         const portfolioData = await getWorkerPortfolio(userData.id);
// //         setPortfolios(portfolioData || []);
// //       } catch (err) {
// //         console.error(err);
// //         alert("Failed to load user or portfolios. Please login again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchData();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleFileChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     const previews = files.map((file) => ({
// //       url: URL.createObjectURL(file),
// //       type: file.type.startsWith("video") ? "video" : "image",
// //     }));
// //     setFormData((prev) => ({ ...prev, mediaFiles: files, previews }));
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     const files = Array.from(e.dataTransfer.files);
// //     const previews = files.map((file) => ({
// //       url: URL.createObjectURL(file),
// //       type: file.type.startsWith("video") ? "video" : "image",
// //     }));
// //     setFormData((prev) => ({
// //       ...prev,
// //       mediaFiles: [...prev.mediaFiles, ...files],
// //       previews: [...prev.previews, ...previews],
// //     }));
// //   };

// //   const handleDragOver = (e) => e.preventDefault();

// //   const handleSubmit = async () => {
// //     try {
// //       let portfolio;
// //       if (editingPortfolio) {
// //         portfolio = await updatePortfolio(editingPortfolio.id, {
// //           title: formData.title,
// //           description: formData.description,
// //         });
// //       } else {
// //         portfolio = await createPortfolio({
// //           title: formData.title,
// //           description: formData.description,
// //         });
// //       }

// //       if (formData.mediaFiles.length > 0) {
// //         const mediaForm = new FormData();
// //         formData.mediaFiles.forEach((file) => mediaForm.append("media", file));
// //         await addPortfolioMedia(portfolio.id, mediaForm);
// //       }

// //       alert("Portfolio saved");
// //       setShowForm(false);
// //       setEditingPortfolio(null);
// //       const portfolioData = await getWorkerPortfolio(user.id);
// //       setPortfolios(portfolioData || []);
// //       setFormData({ title: "", description: "", mediaFiles: [], previews: [] });
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to save portfolio");
// //     }
// //   };

// //   const handleEdit = (portfolio) => {
// //     setEditingPortfolio(portfolio);
// //     setFormData({
// //       title: portfolio.title,
// //       description: portfolio.description,
// //       mediaFiles: [],
// //       previews: [],
// //     });
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this portfolio?")) return;
// //     await deletePortfolio(id);
// //     setPortfolios((prev) => prev.filter((p) => p.id !== id));
// //   };

// //   const handleDeleteMedia = async (portfolioId, mediaId) => {
// //     if (!window.confirm("Delete this media?")) return;
// //     await deletePortfolioMedia(portfolioId, mediaId);
// //     setPortfolios((prev) =>
// //       prev.map((p) =>
// //         p.id === portfolioId
// //           ? { ...p, media: p.media.filter((m) => m.id !== mediaId) }
// //           : p
// //       )
// //     );
// //   };

// //   const handleShowComments = async (portfolioId) => {
// //     const res = await getWorkerComments(portfolioId);
// //     setComments(res);
// //     setCommentsPopup(true);
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="wpd-container">
// //       <button className="wpd-btn wpd-create-btn" onClick={() => setShowForm(true)}>Create Portfolio</button>

// //       {showForm && (
// //         <div className="wpd-popup-form">
// //           <h3>{editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}</h3>
// //           <input
// //             name="title"
// //             placeholder="Title"
// //             value={formData.title}
// //             onChange={handleInputChange}
// //           />
// //           <textarea
// //             name="description"
// //             placeholder="Description"
// //             value={formData.description}
// //             onChange={handleInputChange}
// //           />

// //           <div
// //             className="wpd-drag-drop"
// //             onDrop={handleDrop}
// //             onDragOver={handleDragOver}
// //             onClick={() => document.getElementById("wpd-file-input").click()}
// //           >
// //             Drag & Drop files here or click to upload
// //             <input
// //               id="wpd-file-input"
// //               type="file"
// //               multiple
// //               onChange={handleFileChange}
// //               accept="image/*,video/*"
// //             />
// //           </div>

// //           {formData.previews.length > 0 && (
// //             <div className="wpd-preview-grid">
// //               {formData.previews.map((media, idx) => (
// //                 <div key={idx} className="wpd-preview-item">
// //                   {media.type === "video" ? (
// //                     <video src={media.url} controls />
// //                   ) : (
// //                     <img src={media.url} alt="preview" />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           <div className="wpd-popup-btns">
// //             <button className="wpd-btn wpd-popup-btn" onClick={handleSubmit}>
// //               {editingPortfolio ? "Save Changes" : "Create Portfolio"}
// //             </button>
// //             <button
// //               className="wpd-btn wpd-popup-btn wpd-popup-btn-cancel"
// //               onClick={() => {
// //                 setShowForm(false);
// //                 setEditingPortfolio(null);
// //                 setFormData({ title: "", description: "", mediaFiles: [], previews: [] });
// //               }}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="wpd-portfolio-list">
// //         {portfolios.map((p) => (
// //           <div key={p.id} className="wpd-portfolio-card">
// //             {p.media?.length > 0 && (
// //               <div className="wpd-portfolio-media">
// //                 {p.media.map((m) => (
// //                   <div key={m.id} className="wpd-media-item">
// //                     {m.is_video ? (
// //                       <video src={m.file} controls />
// //                     ) : (
// //                       <img src={m.file} alt={p.title} />
// //                     )}
// //                     <button
// //                       className="wpd-media-delete-btn"
// //                       onClick={() => handleDeleteMedia(p.id, m.id)}
// //                     >
// //                       X
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //             <h4>{p.title}</h4>
// //             <p>{p.description}</p>
// //             <button className="wpd-btn" onClick={() => handleShowComments(p.id)}>Comments</button>
// //             <button className="wpd-btn" onClick={() => handleEdit(p)}>Edit</button>
// //             <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => handleDelete(p.id)}>Delete</button>
// //           </div>
// //         ))}
// //       </div>

// //       {commentsPopup && (
// //         <div className="wpd-popup-comments">
// //           <h4>Comments</h4>
// //           <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => setCommentsPopup(false)}>Close</button>
// //           <ul>
// //             {comments.map((c) => (
// //               <li key={c.id}>
// //                 <strong>{c.user.username}:</strong> {c.comment}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   getCurrentUser
// } from "../../api/api";
// import {
//   getWorkerPortfolio,
//   createPortfolio,
//   updatePortfolio,
//   deletePortfolio,
//   addPortfolioMedia,
//   deletePortfolioMedia,
//   getWorkerComments,
// } from "../../api/workerPortfolioApi";
// import "./styles/WorkerPortfolio.css";

// export default function WorkerPortfolioDashboard() {
//   const [user, setUser] = useState(null);
//   const [portfolios, setPortfolios] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showForm, setShowForm] = useState(false);
//   const [editingPortfolio, setEditingPortfolio] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     mediaFiles: [],
//     previews: [],
//   });

//   const [commentsPopup, setCommentsPopup] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [dragOver, setDragOver] = useState(false);

//   // Draggable
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [popupPos, setPopupPos] = useState({ x: window.innerWidth/2 - 250, y: window.innerHeight/2 - 200 });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const userData = await getCurrentUser();
//         if (!userData?.id) throw new Error("User not found");
//         setUser(userData);

//         const portfolioData = await getWorkerPortfolio(userData.id);
//         setPortfolios(portfolioData || []);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load user or portfolios. Please login again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => ({
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith("video") ? "video" : "image",
//     }));
//     setFormData((prev) => ({ ...prev, mediaFiles: files, previews }));
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     const previews = files.map((file) => ({
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith("video") ? "video" : "image",
//     }));
//     setFormData((prev) => ({
//       ...prev,
//       mediaFiles: [...prev.mediaFiles, ...files],
//       previews: [...prev.previews, ...previews],
//     }));
//   };

//   const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
//   const handleDragLeave = () => setDragOver(false);

//   // Draggable handlers (only header)
//   const handleMouseDown = (e) => {
//     if (e.target.classList.contains("wpd-popup-form-header")) {
//       setDragging(true);
//       setDragOffset({ x: e.clientX - popupPos.x, y: e.clientY - popupPos.y });
//     }
//   };
//   const handleMouseMove = (e) => {
//     if (dragging) {
//       setPopupPos({
//         x: e.clientX - dragOffset.x,
//         y: e.clientY - dragOffset.y,
//       });
//     }
//   };
//   const handleMouseUp = () => setDragging(false);

//   const handleSubmit = async () => {
//     try {
//       let portfolio;
//       if (editingPortfolio) {
//         portfolio = await updatePortfolio(editingPortfolio.id, {
//           title: formData.title,
//           description: formData.description,
//         });
//       } else {
//         portfolio = await createPortfolio({
//           title: formData.title,
//           description: formData.description,
//         });
//       }

//       if (formData.mediaFiles.length > 0) {
//         const mediaForm = new FormData();
//         formData.mediaFiles.forEach((file) => mediaForm.append("media", file));
//         await addPortfolioMedia(portfolio.id, mediaForm);
//       }

//       alert("Portfolio saved");
//       setShowForm(false);
//       setEditingPortfolio(null);
//       const portfolioData = await getWorkerPortfolio(user.id);
//       setPortfolios(portfolioData || []);
//       setFormData({ title: "", description: "", mediaFiles: [], previews: [] });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save portfolio");
//     }
//   };

//   const handleEdit = (portfolio) => {
//     setEditingPortfolio(portfolio);
//     setFormData({
//       title: portfolio.title,
//       description: portfolio.description,
//       mediaFiles: [],
//       previews: [],
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this portfolio?")) return;
//     await deletePortfolio(id);
//     setPortfolios((prev) => prev.filter((p) => p.id !== id));
//   };

//   const handleDeleteMedia = async (portfolioId, mediaId) => {
//     if (!window.confirm("Delete this media?")) return;
//     await deletePortfolioMedia(portfolioId, mediaId);
//     setPortfolios((prev) =>
//       prev.map((p) =>
//         p.id === portfolioId
//           ? { ...p, media: p.media.filter((m) => m.id !== mediaId) }
//           : p
//       )
//     );
//   };

//   const handleShowComments = async (portfolioId) => {
//     const res = await getWorkerComments(portfolioId);
//     setComments(res);
//     setCommentsPopup(true);
//   };

//   if (loading)
//     return (
//       <div className="wpd-skeleton-grid">
//         {Array(6).fill(0).map((_, i) => (
//           <div key={i} className="wpd-portfolio-skeleton"></div>
//         ))}
//       </div>
//     );

//   return (
//     <div className="wpd-container">
//       <header className="wpd-header">
//         <h2>{user?.name || "Your"} Portfolio Dashboard</h2>
//         <button className="wpd-btn wpd-create-btn" onClick={() => setShowForm(true)}>
//           {editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}
//         </button>
//       </header>

//       {/* Popup Form */}
//       {showForm && (
//         <motion.div
//           className="wpd-popup-form"
//           style={{ top: popupPos.y, left: popupPos.x, transform: "translate(0,0)" }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.8, opacity: 0 }}
//         >
//           <h3 className="wpd-popup-form-header">{editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}</h3>

//           <input
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />

//           <div
//             className={`wpd-drag-drop ${dragOver ? "drag-over" : ""}`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onClick={() => document.getElementById("wpd-file-input").click()}
//           >
//             Drag & Drop files here or click to upload
//             <input
//               id="wpd-file-input"
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               accept="image/*,video/*"
//             />
//           </div>

//           {formData.previews.length > 0 && (
//             <div className="wpd-preview-grid">
//               {formData.previews.map((media, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="wpd-preview-item"
//                   whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
//                 >
//                   {media.type === "video" ? (
//                     <video src={media.url} controls />
//                   ) : (
//                     <img src={media.url} alt="preview" />
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           )}

//           <div className="wpd-popup-btns">
//             <button className="wpd-btn wpd-popup-btn" onClick={handleSubmit}>
//               {editingPortfolio ? "Save Changes" : "Create Portfolio"}
//             </button>
//             <button
//               className="wpd-btn wpd-popup-btn wpd-popup-btn-cancel"
//               onClick={() => {
//                 setShowForm(false);
//                 setEditingPortfolio(null);
//                 setFormData({ title: "", description: "", mediaFiles: [], previews: [] });
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* Portfolio Cards */}
//       <div className="wpd-portfolio-list">
//         <AnimatePresence>
//           {portfolios.map((p, index) => (
//             <motion.div
//               key={p.id}
//               className="wpd-portfolio-card"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
//             >
//               {p.media?.length > 0 ? (
//                 <div className="wpd-portfolio-media">
//                   {p.media.map((m) => (
//                     <div key={m.id} className="wpd-media-item">
//                       {m.is_video ? (
//                         <video src={m.file} controls />
//                       ) : (
//                         <img src={m.file} alt={p.title} />
//                       )}
//                       <button
//                         className="wpd-media-delete-btn"
//                         onClick={() => handleDeleteMedia(p.id, m.id)}
//                       >
//                         X
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="wpd-no-media">No media uploaded</div>
//               )}
//               <h4>{p.title}</h4>
//               <p>{p.description}</p>
//               <div className="wpd-card-buttons">
//                 <button className="wpd-btn" onClick={() => handleShowComments(p.id)}>Comments</button>
//                 <button className="wpd-btn" onClick={() => handleEdit(p)}>Edit</button>
//                 <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => handleDelete(p.id)}>Delete</button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Comments Popup */}
//       {commentsPopup && (
//         <motion.div
//           className="wpd-popup-comments"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.8, opacity: 0 }}
//         >
//           <h4>Comments</h4>
//           <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => setCommentsPopup(false)}>
//             Close
//           </button>
//           <ul>
//             {comments.map((c) => (
//               <li key={c.id}>
//                 <strong>{c.user.username}:</strong> {c.comment}
//               </li>
//             ))}
//           </ul>
//         </motion.div>
//       )}
//     </div>
//   );
// }
// ... Keep all imports same
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCurrentUser
} from "../../api/api";
import {
  getWorkerPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addPortfolioMedia,
  deletePortfolioMedia,
  getWorkerComments,
} from "../../api/workerPortfolioApi";
import "./styles/WorkerPortfolio.css";

export default function WorkerPortfolioDashboard() {
  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaFiles: [],
    previews: [],
  });

  const [commentsPopup, setCommentsPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // Draggable popup
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: window.innerWidth/2 - 250, y: window.innerHeight/2 - 200 });

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getCurrentUser();
        if (!userData?.id) throw new Error("User not found");
        setUser(userData);

        const portfolioData = await getWorkerPortfolio(userData.id);
        setPortfolios(portfolioData || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load user or portfolios. Please login again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({ url: URL.createObjectURL(file), type: file.type.startsWith("video") ? "video" : "image"}));
    setFormData(prev => ({...prev, mediaFiles: files, previews}));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const previews = files.map(file => ({ url: URL.createObjectURL(file), type: file.type.startsWith("video") ? "video" : "image"}));
    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };
  const handleDragOver = e => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleMouseDown = e => {
    if (e.target.classList.contains("wpd-popup-form-header")) {
      setDragging(true);
      setDragOffset({x: e.clientX - popupPos.x, y: e.clientY - popupPos.y});
    }
  };
  const handleMouseMove = e => { if (dragging) setPopupPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }); };
  const handleMouseUp = () => setDragging(false);

  const handleSubmit = async () => {
    try {
      let portfolio;
      if (editingPortfolio) {
        portfolio = await updatePortfolio(editingPortfolio.id, { title: formData.title, description: formData.description });
      } else {
        portfolio = await createPortfolio({ title: formData.title, description: formData.description });
      }

      if (formData.mediaFiles.length > 0) {
        const mediaForm = new FormData();
        formData.mediaFiles.forEach(file => mediaForm.append("media", file));
        await addPortfolioMedia(portfolio.id, mediaForm);
      }

      alert("Portfolio saved");
      setShowForm(false);
      setEditingPortfolio(null);
      const portfolioData = await getWorkerPortfolio(user.id);
      setPortfolios(portfolioData || []);
      setFormData({ title: "", description: "", mediaFiles: [], previews: [] });
    } catch (err) {
      console.error(err);
      alert("Failed to save portfolio");
    }
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({ title: portfolio.title, description: portfolio.description, mediaFiles: [], previews: [] });
    setShowForm(true);
  };

  const handleDelete = async (id) => { if(!window.confirm("Delete this portfolio?")) return; await deletePortfolio(id); setPortfolios(prev => prev.filter(p => p.id !== id)); };
  const handleDeleteMedia = async (portfolioId, mediaId) => { if(!window.confirm("Delete this media?")) return; await deletePortfolioMedia(portfolioId, mediaId); setPortfolios(prev => prev.map(p => p.id === portfolioId ? {...p, media: p.media.filter(m => m.id !== mediaId)} : p)); };

  const handleShowComments = async (portfolioId) => {
    const res = await getWorkerComments(portfolioId);
    setComments(res.results || []);
    setCommentsPopup(true);
  };

  if (loading) return <div className="wpd-skeleton-grid">{Array(6).fill(0).map((_, i) => <div key={i} className="wpd-portfolio-skeleton"></div>)}</div>;

  return (
    <div className="wpd-container">
      <header className="wpd-header">
        <h2>{user?.name || "Your"} Portfolio Dashboard</h2>
        <button className="wpd-btn wpd-create-btn" onClick={() => setShowForm(true)}>{editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}</button>
      </header>

      {/* Popup Form */}
      {showForm && (
        <motion.div
          className="wpd-popup-form"
          style={{ top: popupPos.y, left: popupPos.x, transform: "translate(0,0)" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h3 className="wpd-popup-form-header">{editingPortfolio ? "Edit Portfolio" : "Create Portfolio"}</h3>

          <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />

          <div className={`wpd-drag-drop ${dragOver ? "drag-over" : ""}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => document.getElementById("wpd-file-input").click()}>
            Drag & Drop files here or click to upload
            <input id="wpd-file-input" type="file" multiple onChange={handleFileChange} accept="image/*,video/*" />
          </div>

          {formData.previews.length > 0 && (
            <div className="wpd-preview-grid">
              {formData.previews.map((media, idx) => (
                <motion.div key={idx} className="wpd-preview-item" whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}>
                  {media.type === "video" ? <video src={media.url} controls /> : <img src={media.url} alt="preview" />}
                </motion.div>
              ))}
            </div>
          )}

          <div className="wpd-popup-btns">
            <button className="wpd-btn wpd-popup-btn" onClick={handleSubmit}>{editingPortfolio ? "Save Changes" : "Create Portfolio"}</button>
            <button className="wpd-btn wpd-popup-btn wpd-popup-btn-cancel" onClick={() => { setShowForm(false); setEditingPortfolio(null); setFormData({ title: "", description: "", mediaFiles: [], previews: [] }); }}>Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Portfolio Cards */}
      <div className="wpd-portfolio-list">
        <AnimatePresence>
          {portfolios.map((p, index) => (
            <motion.div key={p.id} className="wpd-portfolio-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              {p.media?.length > 0 && (
                <div className="wpd-portfolio-media">
                  {p.media.map(m => (
                    <div key={m.id} className="wpd-media-item">
                      {m.is_video ? <video src={m.file} controls /> : <img src={m.file} alt={p.title} />}
                      <button className="wpd-media-delete-btn" onClick={() => handleDeleteMedia(p.id, m.id)}>X</button>
                    </div>
                  ))}
                </div>
              )}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="wpd-card-buttons">
                <button className="wpd-btn" onClick={() => handleShowComments(p.id)}>Comments</button>
                <button className="wpd-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comments Popup */}
      {commentsPopup && (
        <motion.div className="wpd-popup-comments" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
          <h4>Comments</h4>
          <button className="wpd-btn wpd-popup-btn-cancel" onClick={() => setCommentsPopup(false)}>Close</button>
          {comments.map(c => (
            <div key={c.id} className="wpd-comment-card">
              <div className="wpd-comment-avatar">{c.user.username.charAt(0)}</div>
              <div className="wpd-comment-body">
                <span className="wpd-comment-username">{c.user.username}</span>
                <span className="wpd-comment-text">{c.comment}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
