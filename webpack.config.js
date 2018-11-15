const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  mode: 'development',

  devtool: 'source-map',

  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'public')
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common',
          enforce: true
        }
      }
    }
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '*']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.?scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    })
  ]

}