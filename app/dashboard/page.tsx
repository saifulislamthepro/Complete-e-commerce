
import "./style.css"
import LogOutComp from "@/components/SignOut";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { Key } from "react";


type Item = {
    _id: Key,
      productId: String,
      title: String,
      size: String,
      qty: Number,
      price: Number,
      image: String,
      total: Number,
    }
type Order = {
    _id: Key,
    items: Item[],
    subtotal: Number,
    shippingCost: Number,
    total: Number,
    shippingZone: String,

    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    notes: String,
    status: String,
    userId: String,

    createdAt: Date,
    }
export default async function DashboardPage() {

  const session = await getServerSession(authOptions);
    await connectDB();

    const orders =JSON.parse(JSON.stringify( await Order.find({userId: session?.user.id}).lean()))

  return (
    <div className="page dashboard">
        <div className="page-title flex">            
            <h1>Dashboard Page</h1>
        </div>
        <div className="flex">
          <section className="grid">
            <div className="profile">
            <div className="profile-component">
              <h2><i className="fa fa-user" aria-hidden="true"></i> Profile</h2>
              <div className="img flex">
                {session?.user.image ? (
                  <img
                    src={session.user?.image.toString()}
                    alt="profile"
                    width={100}
                  />
                ) : (
                  <h1><i className="fa-solid fa-circle-user"></i></h1>
                )}
              </div>
              <ul>
                <li><strong>Name: </strong>{session?.user.name}</li>
                <li><strong>Email: </strong>{session?.user.email}</li>
                <li><strong>Role: </strong>{session?.user.role}</li>
              </ul>
            </div>
              <h2>Account Settings</h2>
              <div className="settings flex column">
                <button>
                  <i className="fa fa-cog" aria-hidden="true"></i>Account Settings
                </button>
                <LogOutComp/>
              </div>
            </div>
            <div className="orders">
              <h2>Recent Orders</h2>
              {(orders.length === 0)? 
              <p>You have no recent orders.</p> : 
              orders.map((o: Order)=> (
                <div className="order-container flex" key={o._id}>
                  <section>
                    {o.items.map(p => (
                      <li key={p._id} className="flex">
                        <h3>{p.title}</h3>
                        <p><strong>Size:</strong> {p.size}</p>
                        <strong>Qty: {p.qty.toString()}</strong>
                        <img src={p.image.toString()} alt="image" width={100} />
                      </li>
                    ))}
                  </section>
                    <p><strong>Ordered At: {o.createdAt.toString()}</strong></p>
                  <h2>Status: {o.status.toLocaleUpperCase()} - <strong>Total: {o.total.toString()}</strong> /BDT</h2>
                </div>
              ))}
            </div>
          </section>
        </div>
      {/* Add your dashboard components and logic here */}
    </div>
  );
}