const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hot-loader'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '../dist/js', '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      context: __dirname,
      name: '[name]_library'
    }),
    process.env.NODE_ENV === "production" ? new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }) : () => {}
  ]
}
