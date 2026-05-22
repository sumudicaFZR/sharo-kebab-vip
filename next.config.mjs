/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => `sharo-${Date.now()}`
};

export default nextConfig;
