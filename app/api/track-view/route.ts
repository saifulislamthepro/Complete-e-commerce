import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import View, { ViewSource } from "@/models/View";

export async function POST(): Promise<NextResponse> {
  await connectDB();

  const h = await headers();

  const referer = h.get("referer") || "";
  const userAgent = h.get("user-agent") || "";
  const path = h.get("x-pathname") || "/";
  const ip =
    h.get("x-forwarded-for")?.split(",")[0] || "unknown";

  let source: ViewSource = "organic";

  if (
    referer.includes("facebook.com") ||
    referer.includes("l.facebook.com")
  ) {
    source = "facebook";
  } else if (referer && !referer.includes(process.env.NEXT_PUBLIC_SITE_URL || "")) {
    source = "other";
  }

  await View.create({
    path,
    ip,
    source,
    userAgent,
  });

  return NextResponse.json({ success: true });
}
