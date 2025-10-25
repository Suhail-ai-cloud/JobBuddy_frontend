import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { useCurrentUser } from "./hooks/useCurrentUser";


// Pages
import ReviewFormPage from "./components/ReviewFormPage";
import Home from "./pages/Home.jsx";
import WorkerDetails from "./pages/WorkerDetails.jsx";
import WorkerProfile from "./pages/WorkerProfile.jsx";
import Booking from "./pages/Booking.jsx";
import Cart from "./pages/Cart.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import PayBookings from "./pages/PayBookings.jsx";
import Wallet from "./pages/Wallet.jsx";
import Reviews from "./pages/Reviews.jsx";
import Notifications from "./pages/Notifications.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ResetPassword from "./pages/ResetPassword";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import WorkerSearchPage from "./pages/WorkerSearchPage.jsx";
import LandingPage from "./pages/Landing.jsx";


import BecomeWorker from  "./pages/BecomeWorker.jsx";

function App() {
  const { user, loading } = useCurrentUser();
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Worker */}
        <Route path="/worker/:id" element={<WorkerProfile />} />
        <Route path="/workers/:id" element={<WorkerDetails />} />

        {/* Booking & Cart */}
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/payments" element={<PayBookings />} /> {/* All accepted bookings */}
        <Route path="/payment/:id" element={<PayBookings />} /> {/* Optional: single booking */}
        <Route path="/reviews/add/:workerId/:bookingId" element={<ReviewFormPage />} />
        <Route path="/workers/search" element={<WorkerSearchPage />} />
        <Route path="/become-worker" element={<BecomeWorker />} />



        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />

        {/* Reviews */}
        <Route path="/worker/:workerId/reviews" element={<Reviews />} />

        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard" element={<WorkerDashboard />} />
        <Route path="/Profile" element={<UserProfile />} />




        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ForgotPassword  />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
