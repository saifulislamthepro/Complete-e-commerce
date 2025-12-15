import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) { 
    await connectDB();

    const { id } = await params;
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId && mongoose.Types.ObjectId.isValid(order.userId)) {
      const user = await User.findById(order.userId);
      if (user && user.role === "user") {
        user.role = "customer";
        await user.save();
      }
    }
    // ✅ Always return 200 if order exists, even if no user update is needed
    return NextResponse.json({ success: true, order }, { status: 200 });
  }
