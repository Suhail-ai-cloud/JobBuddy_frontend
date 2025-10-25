// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { GoogleOAuthProvider } from "@react-oauth/google";

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
  
//   <GoogleOAuthProvider clientId="491438380222-32o93ps0fj5tn7lnmg8akhncqgutb28h.apps.googleusercontent.com">
//     <App />
//   </GoogleOAuthProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext"; // ✅ correct path

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="491438380222-32o93ps0fj5tn7lnmg8akhncqgutb28h.apps.googleusercontent.com">
    <UserProvider>
      <App />
    </UserProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
