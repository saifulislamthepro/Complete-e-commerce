"use client";

import { useEffect, useState } from "react";
import "./Hero.css";

const banners = [
  "/banners/Banner-01.jpg",
  "/banners/Banner-02.jpg",
  "/banners/Banner-04.jpg"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      <div className="flex">
        <section className="grid">
        <div className="hero-texts flex column">
          <h1>Welcome To Ravaa</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquid a
            minus optio recusandae voluptatem mollitia! Atque quasi, a qui dicta quas
            quaerat. Odit corporis ut magnam. Earum, provident nobis.
          </p>
        </div>

        <div className="hero-banner">
          <img key={index} src={banners[index]} className="banner-img" alt="banner" />
        </div>
        </section>
      </div>
    </div>
  );
}
