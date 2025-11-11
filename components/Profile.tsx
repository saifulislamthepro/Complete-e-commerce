"use client"
import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="profile-component">
      <h2><i className="fa fa-user" aria-hidden="true"></i> Profile</h2>
      <div className="img flex">
        {imageError ? (
          <h1><i className="fa-solid fa-circle-user"></i></h1>
        ) : (
          <img
            src="/glob*e.svg"
            alt="profile"
            width={100}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <ul>
        <li><strong>Name:</strong> SAIFUL ISLAM</li>
        <li><strong>Email:</strong> saifulislamwebdev@gmail.com</li>
        <li><strong>Phone:</strong> 0123456789</li>
        <li><strong>Address:</strong> h-137/10 SR plaza</li>
      </ul>
    </div>
  );
}
