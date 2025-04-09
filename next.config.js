/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during the build
  },
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY, // makes it available on both client & server
  },
};

module.exports = nextConfig;
