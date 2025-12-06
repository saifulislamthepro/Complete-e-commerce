"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {signIn, useSession } from "next-auth/react";

type Product = {
    productId: string;
    title: string;
    price: number;
    images: string[];
};

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const session = useSession();

    const id = searchParams?.get("id") ?? "";
    const size = searchParams?.get("size") ?? "";
    const qty = Number(searchParams?.get("qty") ?? 1) || 1;

    const [product, setProduct] = useState<Product | null>(null);
    const [mounted, setMounted] = useState(false);

    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [shippingZone, setShippingZone] = useState("inside");
    const [paymentMethod, setPaymentMethod] = useState("");

    const shippingCost = shippingZone === "inside" ? 70 : 150;

    // Fetch product by ID
    const fetchProduct = async () => {
        if (!id) return;
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
    };

useEffect(() => {
    setMounted(true);
    fetchProduct();

    const saved = localStorage.getItem("checkoutForm");
    if (saved) {
        const data = JSON.parse(saved);

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setNotes(data.notes || "");
        setShippingZone(data.shippingZone || "inside");
        setPaymentMethod(data.paymentMethod || "");

        // Clear saved data
        localStorage.removeItem("checkoutForm");
    }
}, []);


    
    if (!mounted) return null;

    const subtotal = product ? product.price * qty : 0;
    const total = subtotal + shippingCost;

    // ---------------- ORDER SUBMIT ---------------- //
    const handleOrderSubmit = async (e: any) => {
    e.preventDefault();

    // ⛔ If user is NOT logged in → redirect to login

    if (!session.data) {
    // Save form data before redirect
    const formData = {
        firstName,
        lastName,
        phone,
        email,
        address,
        notes,
        shippingZone,
        paymentMethod,
    };

    localStorage.setItem("checkoutForm", JSON.stringify(formData));
        return signIn(undefined, {
            callbackUrl: window.location.href, // return back to checkout
        });
    } 

    if (!product) return alert("Product not loaded");

    const orderData = {
        items: [{
            productId: product.productId,
            title: product.title,
            size: size,
            qty,
            price: product.price,
            image: product.images[0],
            total: qty * product.price,
        }],
        size,
        qty,
        price: product.price,
        subtotal,
        shippingCost,
        total,
        firstName,
        lastName,
        phone,
        email,
        address,
        notes,
        shippingZone,
        paymentMethod,
        userId: session.data?.user.id
    };

    const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });

    if (res.ok) {
        alert("Order placed successfully!");
        window.location.href = "/dashboard";
    } else {
        alert("Order failed!");
    }
};


    return (
        <div className="page checkout">
            <div className="page-title flex">
                <h1>Checkout Page</h1>
            </div>

            <div className="flex">
                <section className="grid">

                    {/* ------------ BILLING FORM ---------------- */}
                    <form className="grid" onSubmit={handleOrderSubmit}>
                        <h2>Billing Details</h2>

                        <div className="fname">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="lname">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="phone">
                            <label>Phone:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="email">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="address">
                            <label>Address:</label>
                            <textarea
                                rows={10}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="zone">
                            <label>Shipping Zone:</label>
                            <select
                                value={shippingZone}
                                onChange={(e) => setShippingZone(e.target.value)}
                            >
                                <option value="inside">Inside Dhaka - ৳70</option>
                                <option value="outside">Outside Dhaka - ৳150</option>
                            </select>
                        </div>

                        <div className="notes">
                            <label>Order Notes:</label>
                            <textarea
                                rows={10}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="place-order-btn">
                            Place Order
                        </button>

                    </form>

                    {/* ------------ ORDER SUMMARY ---------------- */}
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <hr />

                        <div className="grid table-title">
                            <strong>Product</strong>
                            <strong>Qty</strong>
                            <strong>Total</strong>
                        </div>

                        {product && (
                            <div className="grid table-item">
                                <span>{product.title} (Size {size})</span>
                                <span>{qty}</span>
                                <span>৳{subtotal}</span>
                            </div>
                        )}

                        <hr />
                        <div className="summary-total flex">
                            <strong>Subtotal</strong>
                            <strong>৳{subtotal}</strong>
                        </div>

                        <hr />
                        <div className="shipping flex">
                            <p>Shipping ({shippingZone === "inside" ? "Inside Dhaka" : "Outside Dhaka"})</p>
                            <p>+ ৳{shippingCost}</p>
                        </div>

                        <hr />
                        <div className="total flex">
                            <strong>Total</strong>
                            <strong>৳{total}</strong>
                        </div>

                        <div className="cod flex">
                            <input type="checkbox" name="COD" value={paymentMethod} onChange={()=> setPaymentMethod("Cash On Delivery")} required/> <span>Cash On Delivery</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
