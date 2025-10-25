import React, { useEffect, useState } from "react";
import { getWallet, updateWallet } from "../api/api";

export default function Wallet() {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getWallet()
      .then(res => setWallet(res.data[0] || { balance: 0 }))
      .catch(console.error);
  }, []);

  const topUp = () => {
    updateWallet(wallet.id, { balance: wallet.balance + Number(amount) })
      .then(res => setWallet(res.data))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Wallet</h1>
      <p>Balance: {wallet.balance}</p>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={topUp}>Top Up</button>
    </div>
  );
}
