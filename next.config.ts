import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Ensure it's correctly specified
      },
    ],
  },
};

export default nextConfig;
