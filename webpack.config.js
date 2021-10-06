const DotenvWebpackPlugin = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    devtool: 'inline-cheap-source-map',
    entry: "./src/main.ts",
    target: 'node',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            { 
                test: /.tsx?$/,
                loader: "ts-loader" 
            },
        ],
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new CopyWebpackPlugin( {
            patterns: [
                {from: 'public', to: 'public'}
            ]
        })
    ],
    resolve: {
        preferRelative: true,
    },
}
