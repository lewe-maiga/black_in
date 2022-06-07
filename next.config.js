/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
        domains: ["black-industry.s3.eu-west-3.amazonaws.com"],
    },
};

module.exports = nextConfig;
