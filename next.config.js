/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n:{
    locales:["fr"],
    defaultLocale: "fr"
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
        domains: ["black-industry.s3.eu-west-3.amazonaws.com"],
    },
};

module.exports = nextConfig;
