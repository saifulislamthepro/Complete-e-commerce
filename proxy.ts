
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// PROTECT ROUTES (admin only)
export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const pathname = req.nextUrl.pathname

  // If no session → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  
  // ADMIN PROTECTION
  
  if (pathname.startsWith("/admin")) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  } 
  return NextResponse.next()
} 

// Define which routes should run middleware
export const config = {
  matcher: [
    "/admin/:path*",     // Admin dashboard
    "/dashboard/:path*", // If you want to protect dashboard
  ],
}
