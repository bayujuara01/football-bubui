const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxWebpckPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: paths.build,
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  },
  plugins: [
    // Extracts CSS into separated files
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    // Generate Workbox srvice workers
    new WorkboxWebpckPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /.(?:png|jpg|svg|jpeg)$/,
          handler: "CacheFirst",
          options: {
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60 * 3,
            },
            cacheName: "cache-images",
          },
        },
        {
          urlPattern: /.(?:js|html|css)$/,
          handler: "CacheFirst",
          options: {
            expiration: {
              maxEntries: 80,
              maxAgeSeconds: 30 * 24 * 60 * 60 * 3,
            },
            cacheName: "cache-file",
          },
        },
        {
          urlPattern: /^https:\/\/api.football-data.org(?:\/v2(?:\/|)|\/)/,
          handler: "StaleWhileRevalidate",
          options: {
            expiration: { maxEntries: 100 },
            cacheName: "cache-fetch",
          },
        },
        {
          urlPattern: /^https:\/\/fonts.googleapis.com\//,
          handler: "StaleWhileRevalidate",
          options: {
            expiration: { maxEntries: 10 },
            cacheName: "cache-font",
          },
        },
      ],
      importScripts: ["./assets/sw.js"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
