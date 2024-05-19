/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },

  experimental: { scrollRestoration: true },
};
export default nextConfig;
