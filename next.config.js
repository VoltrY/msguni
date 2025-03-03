/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Statik HTML export için
  images: {
    unoptimized: true, // Hostinger'da Next.js Image optimizasyonu çalışmayabilir
  },
  // Eğer subdomain kullanıyorsanız (msg.unicoretr.com)
  basePath: '',
  assetPrefix: '',
  typescript: {
    // TypeScript hatalarını görmezden gel
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 