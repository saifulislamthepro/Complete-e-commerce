import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Await params (because Next.js passes it as a Promise)
    const { id } = await params;

    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
