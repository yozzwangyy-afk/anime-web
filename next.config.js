/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.myanimelist.net',
      'img1.ak.crunchyroll.com',
      'via.placeholder.com'
    ],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ]
  },
  env: {
    CUSTOM_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}

module.exports = nextConfig
