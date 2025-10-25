import React, { useState, useEffect } from "react";
import { API } from "../../api/api";
import { motion } from "framer-motion";
import "./styles/WorkerSupport.css";

export default function WorkerSupport() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMsg, setReplyMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tickets safely
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tickets/");
      const data = res.data;

      // ✅ Handle array, paginated, or nested formats safely
      if (Array.isArray(data)) {
        setTickets(data);
      } else if (Array.isArray(data.results)) {
        setTickets(data.results);
      } else if (Array.isArray(data.tickets)) {
        setTickets(data.tickets);
      } else {
        console.warn("Unexpected ticket format:", data);
        setTickets([]);
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
      setError("Failed to load tickets.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new ticket
  const handleCreateTicket = async () => {
    if (!subject || !description) return alert("Please enter all fields.");
    try {
      await API.post("/tickets/", { subject, description });
      setSubject("");
      setDescription("");
      fetchTickets();
      alert("Ticket created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket.");
    }
  };

  // Reply to ticket
  const handleReply = async (ticketId) => {
    if (!replyMsg.trim()) return;
    try {
      await API.post(`/tickets/${ticketId}/reply/`, { message: replyMsg });
      setReplyMsg("");
      fetchTickets();
      // Refresh selected ticket view
      const updated = tickets.find((t) => t.id === ticketId);
      if (updated) setSelectedTicket(updated);
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div className="loading-msg">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error-msg">{error}</div>;
  }

  return (
    <div className="support-page">
      <h2>Support Center</h2>

      {!selectedTicket ? (
        <>
          {/* Create New Ticket Section */}
          <motion.div
            className="create-ticket"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Create New Ticket</h3>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleCreateTicket}>Submit Ticket</button>
          </motion.div>

          {/* Ticket List Section */}
          <motion.div
            className="ticket-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Your Tickets</h3>
            {tickets.length === 0 ? (
              <p className="no-tickets">No tickets found.</p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`ticket-card ${
                    ticket.status === "resolved" ? "resolved" : ""
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="ticket-header">
                    <strong>{ticket.subject}</strong>
                    <span className={`status ${ticket.status}`}>
                      {ticket.status?.toUpperCase()}
                    </span>
                  </div>
                  <p>{ticket.description}</p>
                  <small>
                    Created:{" "}
                    {ticket.created_at
                      ? new Date(ticket.created_at).toLocaleDateString()
                      : "N/A"}
                  </small>
                </div>
              ))
            )}
          </motion.div>
        </>
      ) : (
        <>
          {/* Ticket Detail + Reply Section */}
          <motion.div
            className="ticket-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              className="back-btn"
              onClick={() => setSelectedTicket(null)}
            >
              ← Back to Tickets
            </button>

            <h3>{selectedTicket.subject}</h3>
            <p className="ticket-desc">{selectedTicket.description}</p>

            <div className="reply-section">
              <h4>Conversation</h4>
              <div className="replies-box">
                {selectedTicket.replies &&
                selectedTicket.replies.length > 0 ? (
                  selectedTicket.replies.map((r) => (
                    <div
                      key={r.id}
                      className={`reply ${
                        r.sender_name === "admin" ? "admin" : "worker"
                      }`}
                    >
                      <div className="msg-bubble">
                        <strong>{r.sender_name}:</strong>
                        <p>{r.message}</p>
                        <small>
                          {r.timestamp
                            ? new Date(r.timestamp).toLocaleString()
                            : ""}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-replies">No replies yet.</p>
                )}
              </div>

              <div className="reply-box">
                <textarea
                  placeholder="Type your reply..."
                  value={replyMsg}
                  onChange={(e) => setReplyMsg(e.target.value)}
                />
                <button onClick={() => handleReply(selectedTicket.id)}>
                  Send Reply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
