"use client";

import { useState, useEffect, useRef } from "react";
import { ProductType } from "@/types/product";
import Image from "next/image";
import "./Products.css";
import { addToCart } from "./cartHelpers";

type Props = {
  products: ProductType[];
};
type Size  = {
    name: string;
    stock: number;
};
export default function CatProductSlider({ products }: Props) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
      const [selectedSize, setSelectedSize] = useState<any>(null);
      const [qty, setQty] = useState(1);
      const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
      const [alert, setAlert] = useState("");
      const [showAlert, setShowAlert] = useState(false);
    
        // Handle selecting size
        const handleSizeSelect = (s: Size) => {
            setSelectedSize(s);
            setQty(1);
            setAlert("Size selected, now add to cart") // reset qty when selecting a new size
        };
    
    const handleAddToCart = (id: string) => {
      const product = products.find(p => p._id === id);
      setSelectedProduct(product || null);
        if (!selectedSize) {
          setAlert("Please select a size");
          setShowAlert(true);
          return;
        } else {
          setAlert("Size Selected, add to cart");
        }
    
        if (!product) return;
    
        addToCart({
          productId: id,
          price: product.price,
          size: selectedSize,
          qty,
          title: product.title,
          images: product.images
        });
    
        setAlert("Added to cart!");
        setSelectedSize(null);
        setShowAlert(false);
        window.location.href="/cart";
      };
    

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
          <div className="mobile-product" key={item._id}>
                {/* SIZE SELECT */}
                <div className="size flex column">
                  <p>{alert}</p>
                  <div className={`size-div ${showAlert ? "show-size": ""}`}>
                    <p>Size:</p>
                    <div className={`size-container`}>
                        {selectedProduct?.stock.map((s, i) => (
                            <strong
                                key={i}
                                onClick={() => handleSizeSelect(s)}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    border: selectedSize?.name === s.name ? "2px solid black" : "1px solid #ccc",
                                    background: selectedSize?.name === s.name ? "#fff" : "transparent"
                                }}
                            >
                                {s.name}
                            </strong>
                        ))}
                    </div>
                  </div>
                </div>
            <a href={`/product/${item._id}`}>
            <div className="img">
            <img src={item.images[0]} alt={item.title} loading="lazy"/>
            </div>
            <h4>{item.title}</h4>
            </a>
              <a href={`/product/${item._id}`} className="flex">
                <button>View Details</button>
              </a>
          </div>
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
            <div className="web-product" key={item._id}>
                {/* SIZE SELECT */}
                <div className="size flex column">
                  <p>{alert}</p>
                  <div className={`size-div ${showAlert ? "show-size": ""}`}>
                    <p>Size:</p>
                    <div className={`size-container`}>
                        {selectedProduct?.stock.map((s, i) => (
                            <strong
                                key={i}
                                onClick={() => handleSizeSelect(s)}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    border: selectedSize?.name === s.name ? "2px solid black" : "1px solid #ccc",
                                    background: selectedSize?.name === s.name ? "#fff" : "transparent"
                                }}
                            >
                                {s.name}
                            </strong>
                        ))}
                    </div>
                  </div>
                </div>
              <a href={`/product/${item._id}`}>
              <div className="img">
              <img src={item.images[0]} alt={item.title} loading="lazy" />
              </div>
              <h4>{item.title}</h4>
              </a>
              <a href={`/product/${item._id}`} className="flex">
                <button>View Details</button>
              </a>
            </div>
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
                        <div className="product-card" key={item._id}>
                        {/* SIZE SELECT */}
                        <div className="size flex column">
                          <p>{alert}</p>
                          <div className={`size-div ${showAlert ? "show-size": ""}`}>
                            <p>Size:</p>
                            <div className={`size-container`}>
                                {selectedProduct?.stock.map((s, i) => (
                                    <strong
                                        key={i}
                                        onClick={() => handleSizeSelect(s)}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "6px",
                                            border: selectedSize?.name === s.name ? "2px solid black" : "1px solid #ccc",
                                            background: selectedSize?.name === s.name ? "#fff" : "transparent"
                                        }}
                                    >
                                        {s.name}
                                    </strong>
                                ))}
                            </div>
                          </div>
                        </div>
                        <a href={`/product/${item._id}`}>
                          <div className="img-box">
                              <div className="img">
                                  <img src={item.images[0]} alt={item.title} loading="lazy"/>
                              </div>
                          </div>
                          <h3>{item.title}</h3>
                        </a>
                        <a href={`/product/${item._id}`} className="flex">
                          <button>View Details</button>
                        </a>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}
