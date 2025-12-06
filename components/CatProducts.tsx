"use client";

import { useState, useEffect, useRef } from "react";
import { ProductType } from "@/types/product";
import Image from "next/image";
import "./Products.css";

type Props = {
  products: ProductType[];
};

export default function CatProductSlider({ products }: Props) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 640);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

useEffect(() => {
  setMounted(true);
  if(isMobile) return;
  const interval = setInterval(() => {
    setIndex((prev) => {
      // When only 4 items are left, reset to 0
      if (prev === products.length - 3) {
        return 0;
      }
      return prev + 1;
    });
  }, 5000);

  return () => clearInterval(interval);
}, [products.length]);


  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="mobile-grid grid">
        {products.map((item) => (
          <a className="mobile-product" key={item._id} href={`/product/${item._id}`}>
            <div className="img">
            <Image src={item.images[0]} alt={item.title} fill loading="lazy"/>
            </div>
            <h4>{item.title}</h4>
            <p>{item.price} টাকা</p>
          </a>
        ))}
      </div>
    );
  }
  else 
  if (products.length < 4) {
  return (
    <div className="flex">
      <section>        
        <div className="web-grid grid">
          {products.map((item) => (
            <a className="web-product" key={item._id} href={`/product/${item._id}`}>
              <div className="img">
              <Image fill src={item.images[0]} alt={item.title} loading="lazy" />
              </div>
              <h4>{item.title}</h4>
              <p>{item.price} টাকা</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
  return (
    <div className="products-slider-container">
        <div className="flex">
            <section>
                <div className="slider-wrapper">
                    <div
                    className="slider-track"
                    style={{ transform: `translateX(-${index * 260}px)` }} // card width + gap
                    >
                    {products.map((item) => (
                        <a className="product-card" href={`/product/${item._id}`} key={item._id}>
                        <div className="img-box">
                            <div className="img">
                                <Image fill src={item.images[0]} alt={item.title} loading="lazy"/>
                            </div>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.price} টাকা</p>
                        </a>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}
