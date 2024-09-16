/** @type {import('next').NextConfig} */
import webpack from 'webpack';

const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
          };
        config.plugins.push(
          new webpack.ProvidePlugin({
            d3: 'd3',
          })
        );
      }
      return config;
    },
  };
  
export default nextConfig;