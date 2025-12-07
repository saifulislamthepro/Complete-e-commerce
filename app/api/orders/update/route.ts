import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
    await connectDB();

    const body = await req.json();
    const {tran_id, status} = body;
    const order = await Order.findOne({tran_id: tran_id});

    order.status = status,
    order.paymentMethod = "SSLCommerz",

    await order.save();

    console.log(order);
    return NextResponse.json({status: "200", message: "order Updated"});
}
