import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
    images: {
    domains: ['auction-backend-mlzq.onrender.com'],
  },
};

export default createNextIntlPlugin('./next-intl.config.ts')(nextConfig);
