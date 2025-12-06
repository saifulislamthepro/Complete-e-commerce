"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./ImageGallery.css";

type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleMouseMove = (e: any) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="gallery-container">

      {/* Main Display */}
      <div 
        className="main-image-wrapper"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <button onClick={prevImage} className="nav-btn left">❮</button>

        <Image
          fill
          ref={imageRef}
          src={images[activeIndex]}
          alt="product"
          loading="lazy"
          className={`main-image ${zoom ? "zoom-active" : ""}`}
          style={
            zoom
              ? { transformOrigin: `${position.x}% ${position.y}%` }
              : {}
          }
        />

        <button onClick={nextImage} className="nav-btn right">❯</button>
      </div>

      {/* Thumbnails */}
      <div className="thumb-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`thumb ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            alt="thumbnail"
          />
        ))}
      </div>
    </div>
  );
}
