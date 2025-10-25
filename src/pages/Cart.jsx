import React, { useEffect, useState } from "react";
import { getCart } from "../api/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart()
      .then(res => setCart(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? "Cart is empty" : cart.map(b => <div key={b.id}>{b.worker.user.username}</div>)}
    </div>
  );
}
