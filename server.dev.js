// using commonjs and not dynamic import cause its has mismatch with webpack stuff

export default app => {
    /* eslint-disable global-require */
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('./webpack/webpack.config.dev');
    const compiler = webpack(webpackConfig);
    /* eslint-disable global-require */

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(webpackHotMiddleware(compiler));
};
