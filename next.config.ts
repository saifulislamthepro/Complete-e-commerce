import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ravaabd.com",
      },
      {
        protocol: "https",
        hostname: "www.ravaabd.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["ravaabd.com", "www.ravaabd.com"],
    },
  },
};

export default nextConfig;
