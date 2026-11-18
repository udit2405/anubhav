const path = require("path");
// GitHub Pages serves this repo at /anubhav. Set NEXT_PUBLIC_BASE_PATH="" when using a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  webpack: (config) => { config.resolve.alias["@"] = path.resolve(__dirname); return config; },
};
