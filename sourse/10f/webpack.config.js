const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    popup: './popup/index.js',
    newtab: './newtab/index.js',
    background: './background/index.js',
    // contentScripts: './contentScripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '.',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: !isDevMode,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        // use: [isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'manifest.json', to: 'manifest.json', flatten: true },
    ]),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: './index.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      title: 'Newtab',
      template: './index.html',
      filename: 'newtab.html',
      chunks: ['newtab'],
    }),
  ],
};

if (isDevMode) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        popup: 'popup',
        newtab: 'newtab',
        // contentScripts: 'contentScripts/index',
      },
    })
  );
} else {
  console.log('GG');
}

module.exports = config;
