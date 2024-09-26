/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/audio/",
            outputPath: "static/audio/",
            name: "[name].[ext]",
            esModule: false,
          },
        },
      ],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
