"use client";

import { useEffect, useState } from "react";

interface OverviewData {
  today: number;
  last30Days: number;
  organicTotal: number;
  facebook: number;
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchViews() {
      try {
        const res = await fetch("/api/views");
        const json: OverviewData = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    }

    fetchViews();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return <p>Error loading data</p>;

  return (
    <div className="overview-container grid">
      <div className="card">
        <h1><i className="fa-solid fa-eye"></i></h1>
        <h1>{data.today}</h1>
        <h3>Views Today</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-arrows-to-eye"></i></h1>
        <h1>{data.last30Days}</h1>
        <h3>Views (30 days)</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-magnifying-glass-arrow-right"></i></h1>
        <h1>{data.organicTotal}</h1>
        <h3>Organic Total</h3>
      </div>

      <div className="card">
        <h1><i className="fa-brands fa-facebook"></i></h1>
        <h1>{data.facebook}</h1>
        <h3>From Facebook</h3>
      </div>
    </div>
  );
}
