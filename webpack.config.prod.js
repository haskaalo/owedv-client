const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const {DefinePlugin} = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: "https://owedv.com/"
    },
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(require("./config.prod"))
        }),
        new ManifestPlugin()
    ]
});
