const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = ({ env }) => {
  const isProduction = env === 'prod';
  return {
    mode: 'production',
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      publicPath: path.join(
        isProduction ? '.' : '/aboveaveragewp',
        'wp-content/themes/above-average-theme',
        'build'
      ),
      filename: 'index.js',
      assetModuleFilename: path.join('/images', '[name][ext]'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        assert: require.resolve('assert/'),
        child_process: false,
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        url: false,
        buffer: false,
        os: false,
        util: require.resolve('util'),
        querystring: require.resolve('querystring-es3'),
      },
      mainFiles: ['index'],
      alias: {
        Components: path.resolve(__dirname, '..', 'src/Components/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.s?(css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          /**
           * The `type` setting replaces the need for "url-loader"
           * and "file-loader" in Webpack 5.
           *
           * setting `type` to "asset" will automatically pick between
           * outputing images to a file, or inlining them in the bundle as base64
           * with a default max inline size of 8kb
           */
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(
          __dirname,
          '..',
          `.env${isProduction ? '.production' : ''}`
        ),
      }),
      new MiniCssExtractPlugin({ filename: 'index.css' }),
      new CleanWebpackPlugin(),
    ],
  };
};
