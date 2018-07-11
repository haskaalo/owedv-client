const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const {DefinePlugin} = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const buildconfig = {
    apiUrl: "/",
    isDev: false,
};
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: `/`
    },
    optimization: {
        minimizer: [
            new webpack.optimize.UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(buildconfig)
        }),
        new ManifestPlugin()
    ]
});
