"use client";

import Link from "next/link";
import "./style.css";

export default function UnauthorizedPage() {
  return (
    <div className="unauth-page">
      <div className="unauth-box">
        
        {/* Warning Icon */}
        <div className="unauth-icon">
          <div className="unauth-icon-inner">!</div>
        </div>

        <h1>Unauthorized Access</h1>

        <p>You do not have permission to view this page.<br/>Admins only.</p>

        <div className="unauth-buttons">
          <Link href="/" className="home-btn">Go Home</Link>
          <Link href="/dashboard" className="back-btn">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
