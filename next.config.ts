import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bu4gkqk43wetzryg.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
