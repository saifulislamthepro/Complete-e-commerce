import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { email: string }}) {
  try {
    await connectDB();
    const param = await params;
    const email = param.email;

    const user = await User.findOne({email: email});

    return NextResponse.json({ name: user.name, role: user.role });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to find User" },
      { status: 500 }
    );
  }
}
