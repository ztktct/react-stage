/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './dist');
const pkg = require('../package.json');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: assetsPath,
    filename: 'js/[name]-[chunkhash].js',
    publicPath: '/' // `${config.cdn}/${pkg.version}/`, // 可自行修改，类似于这样的路径：//0.1.0/js/main-bfc0c1f45d64de42d017.js
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader']
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'sass-loader'],
        }),
      }
    ],
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    process.env.NODE_ENV === 'analyse' ? new BundleAnalyzerPlugin() : () => {},
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({ filename: 'css/[name]-[chunkhash].css', allChunks: true }),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true
    }),
    webpackIsomorphicToolsPlugin,
  ],
});
/* eslint-enable */
