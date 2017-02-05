module.exports = {
    entry: './es2015-game-base/src/base/main.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'game.bundle.js'
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
