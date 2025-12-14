import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import View from "@/models/View";

export async function GET(): Promise<NextResponse> {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last30 = new Date();
  last30.setDate(last30.getDate() - 30);

  const [
    todayViews,
    views30Days,
    organic,
    facebook,
  ] = await Promise.all([
    View.countDocuments({ createdAt: { $gte: today } }),
    View.countDocuments({ createdAt: { $gte: last30 } }),
    View.countDocuments({ source: "organic" }),
    View.countDocuments({ source: "facebook" }),
  ]);

  return NextResponse.json({
    today: todayViews,
    last30Days: views30Days,
    organicTotal: organic,
    facebook,
  });
}
