import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
};

export default nextConfig;
