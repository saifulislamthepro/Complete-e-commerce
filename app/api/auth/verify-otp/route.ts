import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    resetOtp: hashedOtp,
    resetOtpExpire: { $gt: Date.now() } // still valid
  });

  if (!user) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });

  return NextResponse.json({ message: "OTP verified" });
}
