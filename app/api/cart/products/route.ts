import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  await connectDB();

  const { ids } = await req.json();

  const products = await Product.find({ _id: { $in: ids } });

  return NextResponse.json(products);
}
