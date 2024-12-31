const nextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true,
    domains: ['res.cloudinary.com']
  }
} satisfies import('next').NextConfig

export default nextConfig;