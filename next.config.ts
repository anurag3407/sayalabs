import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    qualities: [75, 82, 85, 90],
  },
};

export default nextConfig;
