const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.dev.conf.js');
const options = {
    contentBase: './dist',
    hot: true,
    port: 3000,
    host: 'localhost',
    disableHostCheck: true
};
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
    console.log('dev server listening on port 3000');
});