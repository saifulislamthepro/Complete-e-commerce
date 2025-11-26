"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getCart, saveCart } from "@/components/cartHelpers";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

type CartItem = {
  productId: string;
  title: string;
  price: number;
  images: string[];
  size: { name: string };
  qty: number;
};

export default function CheckoutCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [shippingZone, setShippingZone] = useState<"inside" | "outside">("inside");
    const [paymentMethod, setPaymentMethod] = useState("");

  const session = useSession();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    setMounted(true);
    const items = getCart();
    setCart(items);
    setLoading(false);

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

  if (!mounted || loading) return null;

  const shippingCost = shippingZone === "inside" ? 70 : 150;
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const total = subtotal + shippingCost;

  const currentUrl = `${pathName}?${searchParams.toString()}`;

  const handlePlaceOrder = async (e: React.FormEvent) => {
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
            callbackUrl: currentUrl, // return back to checkout
        });
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        items: cart.map(item => ({
          productId: item.productId,
          title: item.title,
          size: item.size.name,
          qty: item.qty,
          price: item.price,
          image: item.images[0],
          total: item.qty * item.price
        })),
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
    userId: session.data.user.id,
    paymentMethod,
    }),
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
          {/* BILLING FORM */}
          <form className="grid" onSubmit={handlePlaceOrder}>
            <h2>Billing Details</h2>

            <div className="fname">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="lname">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="phone">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="email">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="address">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
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
                onChange={(e) => setShippingZone(e.target.value as "inside" | "outside")}
              >
                <option value="inside">Inside Dhaka - ৳70</option>
                <option value="outside">Outside Dhaka - ৳150</option>
              </select>
            </div>

            <div className="notes">
              <label htmlFor="notes">Order Notes:</label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <hr />

            <div className="grid table-title">
              <strong>Product</strong>
              <strong>Qty</strong>
              <strong>Total</strong>
            </div>

            {cart.map((it, idx) => (
              <div key={idx} className="grid table-item">
                <span>
                  {it.title} (Size {it.size.name})
                </span>
                <span>{it.qty}</span>
                <span>৳{it.price * it.qty}</span>
              </div>
            ))}

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

            <div className="ssl">
              <input type="checkbox" name="online" />{" "}
              <span>Pay Online (credit/Debit card/ Mobile Banking/ bKash)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}