const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const host = process.env.HOST || 'localhost';
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', 'prodBuild'),
    publicPath: path.join('wp-content/themes/above-average-theme', 'prodBuild'),
    filename: 'index.js',
    assetModuleFilename: path.join('/images', '[name][ext]'),
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
    ],
  },
};
