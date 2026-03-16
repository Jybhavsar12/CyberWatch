import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Compiler in development for faster startup
  reactCompiler: process.env.NODE_ENV === 'production',

  // Only use standalone output for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),

  // Skip type checking in dev (use editor instead)
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // Skip ESLint during builds for faster compilation
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  // Optimize webpack for faster builds
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce bundle size in dev
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
};

export default nextConfig;
