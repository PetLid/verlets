module.exports = {
    entry: {
        basic: './src/index/main.js',
        muscles: './src/muscles/main.js'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
        //        optional: "runtime",
                cacheDirectory: true
            }
        }]
    }
}
