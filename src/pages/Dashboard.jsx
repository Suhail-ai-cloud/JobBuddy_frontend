// import { useEffect, useState } from "react";
// import { API } from "../api/api";
// import "./styles/Dashboard.css";

// function Dashboard() {
//   const [workers, setWorkers] = useState([]);

//   useEffect(() => {
//     API.get("/workers/")
//       .then(res => setWorkers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <h2>Available Workers</h2>
//       <div className="worker-grid">
//         {workers.map(w => (
//           <div key={w.id} className="worker-card">
//             <img src={w.user.profile_image || "/default.png"} alt={w.user.username}/>
//             <h3>{w.user.username}</h3>
//             <p>Skills: {w.skills}</p>
//             <p>Rating: {w.rating}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
