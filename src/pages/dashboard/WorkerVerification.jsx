import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiCamera, FiFileText, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { sendWorkerVerificationRequest, getWorkerVerificationStatus, MEDIA_BASE, createVerificationPayment, confirmVerificationPayment } from "../../api/api";
import "./styles/WorkerVerification.css"; // we’ll define this CSS below

const dummyProfile = "https://via.placeholder.com/150?text=Profile";
const dummyDocument = "https://via.placeholder.com/150?text=ID+Document";
const dummyCertificate = "https://via.placeholder.com/150?text=Certificate";
const dummyPortfolio = "https://via.placeholder.com/150?text=Portfolio";

export default function WorkerVerification() {
  const [form, setForm] = useState({ full_name: "", date_of_birth: "", additional_info: "" });
  const [files, setFiles] = useState({ selfie: null, id_document: null, certificates: null, portfolio: null });
  const [statusMessage, setStatusMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);


  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await getWorkerVerificationStatus();
      setCurrentStatus(res.status);
      setAdminNotes(res.admin_notes || "");
    } catch (e) {
      console.error(e);
    }
  };
  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const order = await createVerificationPayment();

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "JobBuddy Verification",
        description: "Worker Verification Fee",
        order_id: order.order_id,
        handler: async function (response) {
          await confirmVerificationPayment({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          setPaymentDone(true);
          alert("Payment successful! You can now submit your verification form.");
        },
        prefill: { name: form.full_name, email: "user@example.com" },
        theme: { color: "#1D4ED8" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed, please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("date_of_birth", form.date_of_birth);
    formData.append("additional_info", form.additional_info);
    Object.keys(files).forEach((k) => files[k] && formData.append(k, files[k]));

    try {
      await sendWorkerVerificationRequest(formData);
      setStatusMessage("✅ Verification request sent successfully!");
      fetchStatus();
    } catch (e) {
      console.error(e);
      setStatusMessage("❌ Failed to submit verification request.");
    }
  };

  if (currentStatus === "approved") {
    return (
      <div className="verification-approved">
        <FiCheckCircle size={50} color="green" />
        <h2>Your account is verified!</h2>
      </div>
    );
  }
  if (!paymentDone) {
  return (
    <motion.div
  className="payment-section"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <motion.div
    className="payment-card"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <motion.h2
      className="payment-title"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      🔒 Verify Your Identity
    </motion.h2>

    <motion.p
      className="payment-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      To ensure authenticity and build trust, please pay a small <strong>₹99 verification fee</strong>.
    </motion.p>

    <motion.div
      className="price-display"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <span className="currency">₹</span>
      <span className="amount">99</span>
    </motion.div>

    <motion.button
      className="pay-btn"
      whileHover={{ scale: 1.05, backgroundColor: "#ff5a5f" }}
      whileTap={{ scale: 0.95 }}
      onClick={handlePayment}
      disabled={paymentLoading}
    >
      {paymentLoading ? "Processing..." : "Pay & Continue"}
    </motion.button>

    <motion.div
      className="trust-badge"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Secure Payment" />
      <p>100% Secure Payment via Razorpay</p>
    </motion.div>
  </motion.div>
</motion.div>

  );
}

  return (
    <motion.div
      className="worker-verification"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
    
      <h2>Worker Verification</h2>
      <p className={`status ${currentStatus}`}>Status: {currentStatus || "Not submitted"}</p>
      {currentStatus === "rejected" && <p className="admin-notes">Admin Notes: {adminNotes}</p>}

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={form.date_of_birth}
          onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Additional Info / Skills</label>
        <textarea
          placeholder="List your skills, experience, or any additional info..."
          value={form.additional_info}
          onChange={(e) => setForm({ ...form, additional_info: e.target.value })}
        />
      </div>

      <div className="file-upload-grid">
        {/* Selfie */}
        <FileUpload
          label="Profile Photo / Selfie"
          file={files.selfie}
          setFile={(file) => setFiles({ ...files, selfie: file })}
          placeholder={dummyProfile}
          icon={<FiCamera />}
        />
        {/* ID Document */}
        <FileUpload
          label="ID Document"
          file={files.id_document}
          setFile={(file) => setFiles({ ...files, id_document: file })}
          placeholder={dummyDocument}
          icon={<FiFileText />}
        />
        {/* Certificates */}
        <FileUpload
          label="Certificates (Optional)"
          file={files.certificates}
          setFile={(file) => setFiles({ ...files, certificates: file })}
          placeholder={dummyCertificate}
          icon={<FiFileText />}
        />
        {/* Portfolio */}
        <FileUpload
          label="Portfolio (Optional)"
          file={files.portfolio}
          setFile={(file) => setFiles({ ...files, portfolio: file })}
          placeholder={dummyPortfolio}
          icon={<FiFileText />}
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        <FiUpload /> Send Verification Request
      </button>
      {statusMessage && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{statusMessage}</motion.p>}
    </motion.div>
  );
}

// ---------------- FileUpload Component ----------------
function FileUpload({ label, file, setFile, placeholder, icon }) {
  const preview = file ? URL.createObjectURL(file) : placeholder;
  return (
    <motion.div
      className="file-upload"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <label>{label}</label>
      <img src={preview} alt={label} />
      <div className="upload-overlay">{icon}</div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </motion.div>
  );
}
