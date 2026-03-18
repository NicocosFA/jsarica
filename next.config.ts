import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // Esto le dice a Next.js que cree archivos HTML reales
  images: {
    unoptimized: true, // Necesario para que las imágenes se vean en GitHub
  },
};

export default nextConfig;
