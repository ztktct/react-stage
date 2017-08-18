/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const strip = require('strip-loader');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './dist');
const config = require('../config/production');
const pkg = require('../package.json');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const AntTheme = require(path.resolve(__dirname, '../package.json'))['ant-theme'];

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: assetsPath,
    filename: 'js/[name]-[hash].js',
    publicPath: `${config.cdn.host}${config.cdn.path}/${pkg.version}/`,
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: [strip.loader('debug'), 'babel-loader'] },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader'] }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=2&sourceMap',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                modifyVars: AntTheme,
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&sourceMap', 'postcss-loader', 'sass-loader'],
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
      components: path.resolve(__dirname, '..') + '/src/common/components',
      apis: path.resolve(__dirname, '..') + '/src/common/apis',
      actions: path.resolve(__dirname, '..') + '/src/common/actions',
      reducers: path.resolve(__dirname, '..') + '/src/common/reducers',
      utils: path.resolve(__dirname, '..') + '/src/common/utils',
      constants: path.resolve(__dirname, '..') + '/src/common/constants',
      images: path.resolve(__dirname, '..') + '/src/common/images',
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
      },

      IS_CLIENT: true,
      IS_SERVER: false,
      IS_DEVELOPMENT: false,
      ENABLE_DEVTOOLS: false,
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
      name: 'vendor',
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
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    webpackIsomorphicToolsPlugin,
  ],
};
/* eslint-enable */
