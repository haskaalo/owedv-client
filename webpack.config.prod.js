const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const {DefinePlugin} = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");

const buildconfig = {
    apiUrl: "/",
    isDev: false,
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: `/`
    },
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(buildconfig)
        }),
        new ManifestPlugin()
    ]
});
