const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  entry: ['@babel/polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, isProduction ? 'public/dist' : 'public'),
    filename: isProduction ? 'bundle.[hash].js' : 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['public/dist', 'index.html']),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: isProduction ? '../index.html' : 'index.html',
    }),
  ],
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
  },
};
