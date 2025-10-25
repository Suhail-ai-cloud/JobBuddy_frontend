import React, { useState } from "react";
import { makePayment } from "../api/api";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { id } = useParams(); // booking id
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    makePayment({ booking: id, amount })
      .then(res => alert("Payment successful!"))
      .catch(err => alert("Payment failed"));
  };

  return (
    <div>
      <h1>Payment</h1>
      <form onSubmit={handlePayment}>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}
