import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['ipfs.io', 'nft - cdn.alchemy.com', 'cdn.reown.com', 'reown.com', 'www.reown.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ Allow all domains
      },
    ],
  },
};

export default nextConfig;
