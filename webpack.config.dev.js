const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const {HotModuleReplacementPlugin, DefinePlugin} = require('webpack');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: "[name].js",
        publicPath: "http://localhost:8080/built/"
    },
    devServer: {
        contentBase: "./dist",
        publicPath: "http://localhost:8080/built/"
    },
    module: {
        rules: [
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(require("./config.dev"))
        })
    ]
});