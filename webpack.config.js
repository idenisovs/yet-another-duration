const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        library: "yetAnotherDuration",
        libraryTarget: "umd",
        globalObject: "typeof self !== 'undefined' ? self : this"
    }
};
