"use client";

import { useEffect, useState } from "react";

type OrderStatus = "pending" | "completed" | "delivered";

interface Order {
  _id: string;
  status: OrderStatus;
  createdAt: string;
}

interface OrderStats {
  today: number;
  month: number;
  pending: number;
  completed: number;
}

export default function OrderOverview() {
  const [stats, setStats] = useState<OrderStats>({
    today: 0,
    month: 0,
    pending: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const orders: Order[] = await res.json();

        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const startOfMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );

        const stats: OrderStats = {
          today: 0,
          month: 0,
          pending: 0,
          completed: 0,
        };

        orders.forEach((order) => {
          const created = new Date(order.createdAt);

          if (created >= startOfToday) {
            stats.today++;
          }

          if (created >= startOfMonth) {
            stats.month++;
          }

          if (order.status === "pending") {
            stats.pending++;
          }

          if (order.status === "delivered") {
            stats.completed++;
          }
        });

        setStats(stats);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="overview-container grid">
      <div className="card">
        <h1><i className="fa-solid fa-basket-shopping"></i></h1>
        <h1>{stats.today}</h1>
        <h3>Orders Today</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-calendar-days"></i></h1>
        <h1>{stats.month}</h1>
        <h3>Orders This Month</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-spinner"></i></h1>
        <h1>{stats.pending}</h1>
        <h3>Pending Orders</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-list-check"></i></h1>
        <h1>{stats.completed}</h1>
        <h3>Completed Orders</h3>
      </div>
    </div>
  );
}
