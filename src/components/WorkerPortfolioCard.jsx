// import React from "react";
// import "./styles/WorkerPortfolioCard.css";

// export default function WorkerPortfolioCard({
//   portfolio,
//   onEdit = () => {},
//   onDelete = () => {},
//   onShowComments = () => {},
//   showActions = true,
// }) {

//   return (
//     <div className="wpc-card">
//       {portfolio.media?.length > 0 && (
//         <div className="wpc-media-grid">
//           {portfolio.media.map((m) => (
//             <div key={m.id} className="wpc-media-item">
//               {m.is_video ? (
//                 <video src={m.file} controls />
//               ) : (
//                 <img src={m.file} alt={portfolio.title} />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="wpc-info">
//         <h3 className="wpc-title">{portfolio.title}</h3>
//         <p className="wpc-desc">{portfolio.description}</p>
//       </div>
//       {showActions && (
//         <div className="wpc-actions">
//           <button className="wpc-btn" onClick={() => onShowComments(portfolio.id)}>
//             Comments
//           </button>
//           <button className="wpc-btn" onClick={() => onEdit(portfolio)}>
//             Edit
//           </button>
//           <button className="wpc-btn wpc-btn-cancel" onClick={() => onDelete(portfolio.id)}>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React from "react";
import { FiImage, FiVideo } from "react-icons/fi";
import "./styles/WorkerPortfolioCard.css";

export default function WorkerPortfolioCard({
  portfolio,
  onEdit = () => {},
  onDelete = () => {},
  onShowComments = () => {},
  showActions = true,
}) {
  const hasMedia = portfolio.media?.length > 0;

  return (
    <div className="wpc-card">
      <div className="wpc-media-grid">
        {hasMedia ? (
          portfolio.media.map((m) => (
            <div key={m.id} className="wpc-media-item">
              {m.is_video ? (
                <video src={m.file} controls />
              ) : (
                <img src={m.file} alt={portfolio.title} />
              )}
            </div>
          ))
        ) : (
          <div className="wpc-placeholder">
            <FiImage size={40} color="#00796b" />
            <p>No Media</p>
          </div>
        )}
      </div>

      <div className="wpc-info">
        <h3 className="wpc-title">{portfolio.title || "Untitled"}</h3>
        <p className="wpc-desc">{portfolio.description || "No description provided."}</p>
      </div>

      {showActions && (
        <div className="wpc-actions">
          <button className="wpc-btn" onClick={() => onShowComments(portfolio.id)}>
            Comments
          </button>
          <button className="wpc-btn" onClick={() => onEdit(portfolio)}>
            Edit
          </button>
          <button className="wpc-btn wpc-btn-cancel" onClick={() => onDelete(portfolio.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
