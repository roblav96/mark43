module.exports = {
    target: 'web',
    devtool: '#source-map',
    entry: {
        main: './source/main'
    },
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.css/, loader: 'style-loader!css-loader' },
            { test: /\.png/, loader: 'url-loader?limit=100000&mimetype=image/png' },
            { test: /\.gif/, loader: 'url-loader?limit=100000&mimetype=image/gif' },
            { test: /\.jpg/, loader: 'file-loader' }
        ]
    }
};
