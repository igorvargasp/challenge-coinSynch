import { join } from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  scrollRestoration: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lorem.space'
      },
      {
        protocol: 'https',
        hostname: 's3.eu-central-1.amazonaws.com'
      }
    ]
  },
  
  sassOptions: {
    includePaths: [join('src', 'styles')],
    prependData: `@import "@/styles/variables.scss";`
  }
};

export default nextConfig;
