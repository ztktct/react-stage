/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './dist');
const config = require('../config/production');
const pkg = require('../package.json');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: assetsPath,
    filename: 'js/[name]-[chunkhash].js',
    publicPath: `${config.cdn}/${pkg.version}/`, // 可自行修改，类似于这样的路径：//0.1.0/js/main-bfc0c1f45d64de42d017.js
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?importLoaders=2&sourceMap&minimize=true', 'postcss-loader']
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?importLoaders=2&sourceMap&minimize=true', 'postcss-loader', 'sass-loader'],
        }),
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      container: path.resolve(__dirname, '..') + '/src/common/container',
      components: path.resolve(__dirname, '..') + '/src/common/components'
    },
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
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
};
/* eslint-enable */
