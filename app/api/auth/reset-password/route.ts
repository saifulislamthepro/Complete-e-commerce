import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 });

  user.password = await bcrypt.hash(password, 10);
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
