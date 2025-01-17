/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "*.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "food-ordering-111.s3.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "food-ordering-111.s3.ap-southeast-1.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;
