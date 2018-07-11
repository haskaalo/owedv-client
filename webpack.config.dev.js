const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const {HotModuleReplacementPlugin, DefinePlugin} = require('webpack');

const buildconfig = {
    apiUrl: "http://localhost:1337",
    isDev: true,
}

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: "./dist",
        index: "html/index.html"
    },
    output: {
        publicPath: "http://localhost:8080/"
    },
    module: {
        rules: [
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(buildconfig)
        })
    ]
});