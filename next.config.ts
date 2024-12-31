const nextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
} satisfies import('next').NextConfig

export default nextConfig;