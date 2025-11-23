
'use client'

import CreateProduct from "@/components/CreateProduct";
import AdminProducts from "@/components/AdminProducts"
import "./style.css"


import Settings from "@/components/Settings";
import { useEffect, useState } from "react";
import AdminOrdersPage from "@/components/Orderlists";

type Product = {
    title: string,
    price: number,
    stock: string[],
    category: string,
    description: string,
    images: File[]
}

export default function MainPage( {activeSidebar}: {activeSidebar: string} ) {

    const [mounted, setMounted] = useState(false)
    const [Products, setProduct] = useState([]);


    const fetchProducts = async() => {
        const res = await fetch("/api/products");

        const data = await res.json();
        setProduct(data);
    }
useEffect(()=>{

    fetchProducts();
    setMounted(true);

},[])
 
if (!mounted) return null;

    if (activeSidebar === 'create') 
        return (
            <div className="main-page">
                <h3><i className="fa fa-plus-square" aria-hidden="true"></i>Create New Item</h3>
                <CreateProduct/>
            </div>
        );

    else if (activeSidebar === 'products') 
        return (
            <div className="main-page">
                <h3>Products</h3>
                <AdminProducts/>
            </div>
        );
    else if (activeSidebar === 'orders') 
        return (
            <div className="main-page">
                <h3>Orders</h3>
                <AdminOrdersPage/>
            </div>
        );
    else if (activeSidebar === 'customers') 
        return (
            <div className="main-page"> 
                <h3>Customers</h3>
                <p>This is the customers page where you can view customer information.</p>
            </div>
        );

    else if (activeSidebar === 'reports') 
        return (
            <div className="main-page">
                <h3>Reports</h3>
                <p>This is the reports page where you can view sales reports.</p>
            </div>
        );
    else if (activeSidebar === 'settings')
        return (
            <div className="main-page">
                <Settings/>
            </div>
        );

    else if (activeSidebar === 'notification')
        return (
            <div className="main-page">
                <h3>Notification</h3>
                <p>This is the notifications page where you can view all notifications.</p>
            </div>
        );

    else
    return (
        <div className="main-page overview flex">
            <div className="heading ">
                <h1>Views</h1>
            </div>
            <div className="card">
                <h1>
                <i className="fa-solid fa-eye"></i>
                </h1>
                <h1>10</h1>
                <h3>views Today</h3>
            </div>
            <div className="card">
                <h1>
                <i className="fa-solid fa-arrows-to-eye"></i>
                </h1>
                <h1>10</h1>
                <h3>views (30days)</h3>
            </div>
            <div className="card">
                <h1>
                <i className="fa-solid fa-magnifying-glass-arrow-right"></i>
                </h1>
                <h1>10</h1>
                <h3>Organic Total</h3>
            </div>
            <div className="card">
                <h1>
                <i className="fa-brands fa-facebook"></i>
                </h1>
                <h1>10</h1>
                <h3>From Facebook</h3>
            </div>
            <hr />
            <div className="heading ">
                <h1>Orders</h1>
            </div>
            <div className="card">
                <h1>
                <i className="fa-solid fa-basket-shopping"></i>
                </h1>
                <h1>10</h1>
                <h3>Orders Today</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-calendar-days"></i></h1>
                <h1>10</h1>
                <h3>Orders This Month</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-spinner"></i></h1>
                <h1>10</h1>
                <h3>Pending Orders</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-list-check"></i></h1>
                <h1>10</h1>
                <h3>Completed Orders</h3>
            </div>

            <hr />

            <div className=" heading">
                <h1></h1>
                <h1>Users</h1>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-users"></i></h1>
                <h1>1000</h1>
                <h3>Total Users</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-user-check"></i></h1>
                <h1>100</h1>
                <h3>Customers</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-address-book"></i></h1>
                <h1>105</h1>
                <h3>New users(7days)</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-person-military-to-person"></i></h1>
                <h1>8</h1>
                <h3>customers(7days)</h3>
            </div>

            <hr />

            <div className=" heading">
                <h1>Products</h1>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-bag-shopping"></i></h1>
                <h1>20</h1>
                <h3>Total Products</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-suitcase"></i></h1>
                <h1>15</h1>
                <h3>In Stock</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-arrow-trend-down"></i></h1>
                <h1>6</h1>
                <h3>Out Of Stock</h3>
            </div>
            <div className="card">
                <h1><i className="fa-solid fa-chart-pie"></i></h1>
                <h1>8</h1>
                <h3>Unsold</h3>
            </div>
        </div>
    );
}