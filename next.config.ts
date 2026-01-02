/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'cdn-icons-png.flaticon.com' },
    ],
  },
  // We ignore typescript errors for faster deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;