import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Increase body size limit for video uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
  // Optimize for static assets and performance
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
