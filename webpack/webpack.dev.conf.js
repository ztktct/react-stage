/* eslint-disable */
// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const assetsPath = path.resolve(__dirname, '../dist');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/index.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/js/vendor-manifest.json')
    }),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({ // <----- you can define yourself variable
      'process.env': {
        NODE_ENV: '"development"',
      }
    }),
    webpackIsomorphicToolsPlugin.development(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html', // 指定模板文件路径
      inject: true,
      env: 'development'  // 插件支持自定义参数，此处是为了在development环境下加载vendor.dll.js文件，生产环境无需加载dll.js文件
    }),
    new FriendlyErrorsPlugin()
  ],
});
/* eslint-enable */
