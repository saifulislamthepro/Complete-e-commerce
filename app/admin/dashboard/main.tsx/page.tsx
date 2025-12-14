
'use client'

import CreateProduct from "@/components/CreateProduct";
import AdminProducts from "@/components/AdminProducts"
import "./style.css"


import Settings from "@/components/Settings";
import { useEffect, useState } from "react";
import AdminOrdersPage from "@/components/Orderlists";
import Overview from "@/components/Overview";
import OrderOverview from "@/components/OrderOverview";
import UsersOverview from "@/components/UsersOverview";
import ProductsOverview from "@/components/ProductsOverview";
import UsersList from "@/components/UsersList";

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
                <UsersList/>
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
            <Overview/>
            <hr />
            <div className="heading ">
                <h1>Orders</h1>
            </div>
            <OrderOverview/>
            <hr />

            <div className=" heading">
                <h1></h1>
                <h1>Users</h1>
            </div>
            <UsersOverview/>
            <hr />

            <div className=" heading">
                <h1>Products</h1>
            </div>
            <ProductsOverview/>
        </div>
    );
}