const nextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true,
    domains: ['alyoum-special.netlify.app', 'res.cloudinary.com']
  }
} satisfies import('next').NextConfig

export default nextConfig;