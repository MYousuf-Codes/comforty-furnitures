/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Use fallback to prevent errors for Node.js modules in the browser
      config.resolve.fallback = {
        dns: false, // Disable dns module for client-side code
      };
    }
    return config;
  },
};

export default nextConfig;
