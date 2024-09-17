/** @type {import('next').NextConfig} */
import webpack from 'webpack';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'), // Utilisation de require.resolve via createRequire
        // Ajoutez d'autres polyfills si nécessaire
      };
    }
    return config;
  },
};