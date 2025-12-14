"use client";

import { useEffect, useState } from "react";

interface ISize {
  name: string;
  stock: number;
}

interface IProduct {
  _id: string;
  productId: string;
  title: string;
  stock: ISize[];
  images: string[];
  featured: boolean;
}

interface IOrderItem {
  productId: string;
  title: string;
  size: string;
  qty: number;
  price: number;
  image: string;
  total: number;
}

interface IOrder {
  _id: string;
  items: IOrderItem[];
  status: string;
  createdAt: string;
}

interface ProductStats {
  total: number;
  inStock: number;
  outOfStock: number;
  unsold: number;
}

export default function ProductsOverview() {
  const [stats, setStats] = useState<ProductStats>({
    total: 0,
    inStock: 0,
    outOfStock: 0,
    unsold: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductsAndOrders() {
      try {
        // Fetch products
        const productsRes = await fetch("/api/products");
        const products: IProduct[] = await productsRes.json();

        // Fetch orders
        const ordersRes = await fetch("/api/orders");
        const orders: IOrder[] = await ordersRes.json();

        // Set of productIds that have been ordered
        const orderedProductIds = new Set<string>();
        orders.forEach((order) => {
          order.items.forEach((item) => orderedProductIds.add(item.productId));
        });

        let total = products.length;
        let inStock = 0;
        let outOfStock = 0;
        let unsold = 0;

        products.forEach((product) => {
          // Aggregate stock across sizes
          const totalStock = product.stock.reduce(
            (acc, size) => acc + size.stock,
            0
          );

          if (totalStock > 0) inStock++;
          else outOfStock++;

          if (!orderedProductIds.has(product.productId)) unsold++;
        });

        setStats({ total, inStock, outOfStock, unsold });
      } catch (error) {
        console.error("Failed to load products or orders", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsAndOrders();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="overview-container grid">
      <div className="card">
        <h1><i className="fa-solid fa-bag-shopping"></i></h1>
        <h1>{stats.total}</h1>
        <h3>Total Products</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-suitcase"></i></h1>
        <h1>{stats.inStock}</h1>
        <h3>In Stock</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-arrow-trend-down"></i></h1>
        <h1>{stats.outOfStock}</h1>
        <h3>Out Of Stock</h3>
      </div>

      <div className="card">
        <h1><i className="fa-solid fa-chart-pie"></i></h1>
        <h1>{stats.unsold}</h1>
        <h3>Unsold</h3>
      </div>
    </div>
  );
}
