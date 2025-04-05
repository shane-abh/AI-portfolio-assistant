/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY, // makes it available on both client & server
  },
};

module.exports = nextConfig;
