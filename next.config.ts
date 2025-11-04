import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default createNextIntlPlugin('./next-intl.config.ts')(nextConfig);
