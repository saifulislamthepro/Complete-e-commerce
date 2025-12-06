"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./Hero.css";

const banners = [
  "/banners/Banner-01.png",
  "/banners/Banner-02.jpg",
  "/banners/Banner-04.jpg"
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);
if (!mounted) return null;
  return (
    <div className="hero">
      <div className="flex">
        <section className="grid">
        <div className="hero-texts flex column">
          <div className="img">
          <Image src={'/banners/Banner-short.png'} alt="banner-short" fill loading="lazy"/>
          </div>
        </div>

        <div className="hero-banner">
          <div className="img">
          <Image key={index} src={banners[index]} className="banner-img" alt="banner" fill loading="lazy"/>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
