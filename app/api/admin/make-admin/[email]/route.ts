import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {email: string}}) {
    await connectDB();
    const param = await params;
    const email = param.email;

    const user = await User.findOneAndUpdate({email: email}, { role: "admin"});

    await user.save;

    return NextResponse.json({message: `${user.name} is Now Admin`})
}
