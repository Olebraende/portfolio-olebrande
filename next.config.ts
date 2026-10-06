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
    qualities: [70, 75],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Anything not served from the production domain (vercel.app aliases, previews, localhost) stays out of search.
      {
        source: '/(.*)',
        has: [{ type: 'host', value: '(?!(www\\.)?olebrande\\.no$).*' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/pics/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  // Norwegian lives at the root, English under /en. Both are served from app/[lang].
  async redirects() {
    return [
      { source: '/tjenester', destination: '/kontakt', permanent: true },
      { source: '/en/tjenester', destination: '/en/kontakt', permanent: true },
      { source: '/no', destination: '/', permanent: true },
      { source: '/no/:path((?!opengraph-image).*)', destination: '/:path', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/no' },
        { source: '/:path((?!en$|en/|no$|no/|api/|_next/|pics/|opengraph-image|twitter-image|apple-icon)[^.]*)', destination: '/no/:path' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
