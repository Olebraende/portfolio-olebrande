import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/pics/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  // Norwegian lives at the root, English under /en. Both are served from app/[lang].
  async redirects() {
    return [
      { source: '/no', destination: '/', permanent: true },
      { source: '/no/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/no' },
        { source: '/:path((?!en$|en/|no$|no/|api/|_next/|pics/)[^.]*)', destination: '/no/:path' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
