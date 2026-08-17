import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  // ... your existing configuration
  
  // Add this line:
  allowedDevOrigins: ['172.18.80.1'], 
};

module.exports = nextConfig;
