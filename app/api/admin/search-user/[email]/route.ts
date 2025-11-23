import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    await connectDB();

    // Await params
    const { email } = await params;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ name: user.name, role: user.role });
  } catch (error) {
    console.error("User Lookup Error:", error);
    return NextResponse.json(
      { error: "Failed to find User" },
      { status: 500 }
    );
  }
}
