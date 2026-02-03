import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/agents/sandton',
        destination: '/property-agents/sandton',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
