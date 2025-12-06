'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function CheckoutButton({ amount, tran_id, placeOrder }) {
    const [mounted, setMounted] = useState(false);

  const handlePayment = async (e) => {
     placeOrder(e); //First place the order to create an order record
    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        tran_id,
      }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };


useEffect(()=> {
        setMounted(true);
    }, []);

    if (!mounted) return null;

  return (
    <div>
        <button
        onClick={(e) => handlePayment(e)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        >
        Pay with SSLCommerz
        </button>
    </div>
  );
}