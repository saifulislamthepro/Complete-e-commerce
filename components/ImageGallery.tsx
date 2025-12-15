"use client";

import { useState, useRef, useEffect } from "react";
import "./ImageGallery.css";

type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Desktop zoom
  const [zoom, setZoom] = useState<boolean>(false);
  const MAX_ZOOM = 6;
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  // Mobile zoom + pan
  const [scale, setScale] = useState<number>(1);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const lastDistance = useRef<number | null>(null);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /* ---------------- Helpers ---------------- */

  const resetZoom = (): void => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    lastDistance.current = null;
    lastTouch.current = null;
  };

  const nextImage = (): void => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  };

  const prevImage = (): void => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  };

  /* ---------------- Desktop Hover Zoom ---------------- */

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  /* ---------------- Mobile Pinch Zoom ---------------- */

  const getDistance = (touches: React.TouchList): number => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault();

    /* PINCH ZOOM */
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);

      if (lastDistance.current === null) {
        lastDistance.current = distance;
        return;
      }

      let newScale = scale + (distance - lastDistance.current) / 120;
      newScale = Math.min(Math.max(newScale, 1), MAX_ZOOM);

      setScale(newScale);
      lastDistance.current = distance;
      return;
    }

    /* PAN (ONE FINGER) */
    if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0];

      if (!lastTouch.current) {
        lastTouch.current = { x: touch.clientX, y: touch.clientY };
        return;
      }

      const dx = touch.clientX - lastTouch.current.x;
      const dy = touch.clientY - lastTouch.current.y;

      setTranslate((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      lastTouch.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (): void => {
    lastDistance.current = null;
    lastTouch.current = null;

    if (scale < 1.05) resetZoom();
  };

  return (
    <div className="gallery-container">
      {/* Main Image */}
      <div
        className="main-image-wrapper"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={prevImage} className="nav-btn left">❮</button>

        <img
          ref={imageRef}
          src={images[activeIndex]}
          alt="product"
          loading="lazy"
          className={`main-image ${zoom ? "zoom-active" : ""}`}
          style={{
            transform: `
              translate(${translate.x}px, ${translate.y}px)
              scale(${scale > 1 ? scale : zoom ? 3 : 1})
            `,
            transformOrigin: zoom
              ? `${position.x}% ${position.y}%`
              : "center",
          }}
        />

        <button onClick={nextImage} className="nav-btn right">❯</button>
      </div>

      {/* Thumbnails */}
      <div className="thumb-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumbnail"
            className={`thumb ${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(index);
              resetZoom();
            }}
          />
        ))}
      </div>
    </div>
  );
}
