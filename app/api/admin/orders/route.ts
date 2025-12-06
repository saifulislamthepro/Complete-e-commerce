import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
