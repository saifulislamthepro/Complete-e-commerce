'use client'

import { useEffect, useState } from "react";
import { addToCart } from "./cartHelpers";
import "./SizeQty.css"

type Size  = {
    name: string;
    stock: number;
};

type Props = {
    id: string;
    stock: Size[],
    price: number,
    productId: string,
    title: string,
    images: string[]
}

export default function SizeQty({ stock, price, productId, images, title, id }: Props ) {
    const [mounted, setMounted] = useState(true);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [qty, setQty] = useState(1);
    const [alert, setAlert] = useState("");


    // Handle selecting size
    const handleSizeSelect = (s: Size) => {
        setSelectedSize(s);
        setQty(1); // reset qty when selecting a new size
    };

    // Handle quantity increase
    const increaseQty = () => {
        if (!selectedSize) return;
        if (qty < selectedSize.stock) {
            setQty(qty + 1);
        }
    };

    // Handle quantity decrease
    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };


const handleAddToCart = () => {
    if (!selectedSize) {
      setAlert("Please select a size");
      return;
    }
    if (selectedSize.stock === 0) {
        setAlert("Selected size is out of stock");
        return;
    }

    addToCart({
      productId,
      price,
      size: selectedSize,
      qty,
      title,
      images
    });

    setAlert("Added to cart!");
    window.location.href = '/cart';
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
    return (
        <div className="client-container grid">
            <div className="size-quantity flex">
                    <p>{alert}</p>
                
                {/* PRICE + STOCK */}
                <div className="price-container flex">
                    <p className="price">{price} টাকা </p>

                    {selectedSize ? (
                        selectedSize.stock > 0 ?
                            <span className="stock">In Stock ({selectedSize.stock})</span>
                        :
                            <span className="stock" style={{color:"red"}}>Out of Stock</span>
                    ) : (
                        <span className="stock">Select Size</span>
                    )}
                </div>

                {/* SIZE SELECT */}
                <div className="size flex">
                    <p>Size:</p>
                    <div className="size-container">
                        {stock.map((s, i) => (
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

                {/* QUANTITY SELECT */}
                <div className="qty flex">
                    <p>Qty:</p>
                    <div className="updater flex">
                        <strong onClick={decreaseQty} style={{cursor: "pointer"}}>-</strong>
                        <strong>{qty}</strong>
                        <strong onClick={increaseQty} style={{cursor: "pointer"}}>+</strong>
                    </div>
                </div>

            </div>

            {/* BUTTONS */}
            <a href={`/checkout?id=${id}&size=${selectedSize?.name}&qty=${qty}`}>
                <button disabled={!selectedSize || selectedSize.stock === 0}>Order Now</button>
            </a>

            <a onClick={handleAddToCart}>
                <button>Add to Cart</button>
            </a>
        </div>
    )
}
