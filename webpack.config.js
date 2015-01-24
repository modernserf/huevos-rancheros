/*eslint-env node */
"use strict";

var webpack =   require('webpack');

module.exports = {
    entry: {
        main: [
            'webpack/hot/dev-server',
            "./src/main.js"
        ]
    },
    output: {
        filename: "js/[name].js",
        path: process.cwd() + "/dist",
        publicPath: "/"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader'},
            {test: /\.jsx$/, loaders: ["react-hot", "6to5", "jsx?harmony"] }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js','.json','.jsx'],
        modulesDirectories: ['node_modules','src']
    }
};
