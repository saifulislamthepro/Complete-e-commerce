// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Optional: custom redirect if not authenticated
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect profile page
    "/orders/:path*",    // protect order creation page
  ],
};