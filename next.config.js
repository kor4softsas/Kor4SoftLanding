/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  
  // Compresión habilitada
  compress: true,
  
  // Optimización del bundle
  swcMinify: true,
  
  // Eliminar console.log en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers de cache para assets estáticos
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Optimización experimental
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lenis'],
  },
};

module.exports = nextConfig;

