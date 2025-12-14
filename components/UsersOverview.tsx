"use client";

import { useEffect, useState } from "react";

type UserRole = "user" | "customer" | "admin";

interface User {
  _id: string;
  role: UserRole;
  createdAt: string;
}

interface UserStats {
  total: number;
  customers: number;
  newUsers7Days: number;
  newCustomers7Days: number;
}

export default function UsersOverview() {
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    customers: 0,
    newUsers7Days: 0,
    newCustomers7Days: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const users: User[] = await res.json();

        const now = new Date();
        const last7Days = new Date();
        last7Days.setDate(now.getDate() - 7);

        let total = users.length;
        let customers = 0;
        let newUsers7Days = 0;
        let newCustomers7Days = 0;

        users.forEach((user) => {
          const created = new Date(user.createdAt);

          if (user.role === "customer") {
            customers++;
          }

          if (created >= last7Days) {
            newUsers7Days++;

            if (user.role === "customer") {
              newCustomers7Days++;
            }
          }
        });

        setStats({
          total,
          customers,
          newUsers7Days,
          newCustomers7Days,
        });
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="overview-container grid">
      <div className="card">
        <h1><i className="fa-solid fa-users"></i></h1>
        <h1>{stats.total}</h1>
        <h3>Total Users</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-user-check"></i></h1>
        <h1>{stats.customers}</h1>
        <h3>Customers</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-address-book"></i></h1>
        <h1>{stats.newUsers7Days}</h1>
        <h3>New Users (7 days)</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-person-military-to-person"></i></h1>
        <h1>{stats.newCustomers7Days}</h1>
        <h3>Customers (7 days)</h3>
      </div>
    </div>
  );
}
