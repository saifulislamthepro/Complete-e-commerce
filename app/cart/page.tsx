"use client";

import { useEffect, useState } from "react";
import { getCart, CartItem, saveCart, removeFromCart } from "@/components/cartHelpers";
import "./style.css";
type Size  = {
    name: string;
    stock: number;
};
type ProductInfo = {
  productId: string;
  title: string;
  images: string[];
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);


  // Increase qty
  const increase = (index: number) => {
    const updated = [...cart];
    updated[index].qty += 1;
    saveCart(updated);
    setCart(updated);
  };

  // Decrease qty
  const decrease = (index: number) => {
    const updated = [...cart];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      saveCart(updated);
      setCart(updated);
    }
  };

const clearCart = () => {
  localStorage.removeItem("cart");
    const items = getCart();
    setCart(items);
};

const handleDelete = (id: string, size: Size) => {
  removeFromCart(id, size);
    const items = getCart();
    setCart(items);
}
  useEffect(() => {
    const items = getCart();
    setCart(items);
  }, []);


  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart page">
      <h2>🛒 Your Cart</h2>

      <div className="flex">
        <section>
            {cart.length === 0 && <p>No items in cart.</p>}

            <div className="flex card-container column">

            { cart.map((item, i) => (
                <div key={i} className="cart-card"> 
                <i className="fa-solid fa-circle-xmark" onClick={() => handleDelete(item.productId, item.size)}></i>
                      <div className="title">
                        <strong>{item.title} /Size: {item.size.name}</strong>
                      </div>
                  {/* Quantity Control */}
                  <div className="functions flex">          
                    <div className="qty-control flex">
                      <button onClick={() => decrease(i)}>-</button>
                      <strong>{item.qty}</strong>
                      <button onClick={() => increase(i)}>+</button>
                    </div>
                  </div>
                  <p>Price: {item.price} × {item.qty} = {item.price * item.qty} tk</p>
                </div>
            ))}
            </div>    
            <div className="total flex"> 
              <div className="">
                <h3>Total: {total} tk</h3> 
                <a href="/checkout/cart">
                    <button>Proceed to Checkout</button>
                </a>  
              </div>             
            </div> 
            <a className="flex">
              <button onClick={clearCart}><i className="fa-solid fa-circle-xmark"></i>Clear cart</button>
            </a>    
        </section>
      </div>
    </div>
  );
}
