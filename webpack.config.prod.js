const {DefinePlugin} = require('webpack');

module.exports = {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            BUILDCONFIG: JSON.stringify(require("./config.prod"))
        })
    ]
}