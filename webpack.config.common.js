const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.tsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        alias: {
            'assets': path.resolve(__dirname, 'src/assets/'),
            'variables': path.resolve(__dirname, 'src/styles/variables.scss')
        },
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loader: "awesome-typescript-loader" },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: "static/img",
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["main"],
            template: path.join(__dirname, "src/html/index.html"),
            filename: "html/layout.html",
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash].css",
            chunkFilename: "static/css/[id].[chunkhash].css"
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/images/E_32x32.png', to: 'static/img/E_32x32.png' },
            { from: 'src/assets/images/E_128x128.png', to: 'static/img/E_128x128.png' }
          ], {})
    ]
};
