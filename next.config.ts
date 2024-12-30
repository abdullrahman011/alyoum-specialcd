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
  },
  target: 'serverless' 
 } satisfies import('next').NextConfig
 
 export default nextConfig;