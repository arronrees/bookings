/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.bookings.arronrees.co.uk',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
