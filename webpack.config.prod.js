const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const {DefinePlugin} = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");

const buildconfig = {
    apiUrl: "https://owedv.com",
    isDev: false,
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: `${buildconfig.apiUrl}/`
    },
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(buildconfig)
        }),
        new ManifestPlugin()
    ]
});
