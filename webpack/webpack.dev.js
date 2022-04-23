const webpack = require('webpack');
const path = require('path');

const host = process.env.HOST || 'localhost';
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: true,
  devServer: {
    host,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
      }),
    }),
  ],
};
