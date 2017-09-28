const Express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const config = require('../config/development');
const webpackConfig = require('./dev.config');

const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = Number(config.port) || 8000;
const uri = `http://${host}:${port}`;

const serverOptions = {
  contentBase: uri,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  historyApiFallback: true
}

const devMiddleware = require('webpack-dev-middleware')(compiler, serverOptions);
const hotMiddleware = require('webpack-hot-middleware')(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
})
const app = new Express();

app.use(devMiddleware);

app.use(hotMiddleware);

// 代理静态资源
app.use(Express.static(require('path').join(__dirname,'../dist')));

let _resolve;
/* eslint-disable */
new Promise((resolve) => {
  _resolve = resolve;
})

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
  // when env is testing, don't need open it
  if (true && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  _resolve();
})

app.listen(port);
