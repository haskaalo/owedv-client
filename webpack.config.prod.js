const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const {DefinePlugin} = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const buildconfig = {
    apiUrl: "/",
    isDev: false,
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: `/`
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(buildconfig)
        }),
        new ManifestPlugin()
    ]
});
