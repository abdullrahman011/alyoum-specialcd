/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.netlify.app'
      }
    ]
  }
} satisfies import('next').NextConfig

export default nextConfig;