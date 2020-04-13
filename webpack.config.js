const path = require('path');

module.exports = {
    // mode: 'development',
    entry: './src/public/js/controller/index.js',
    target: 'node',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'src/public/js/controller'),
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
        ],
    },
};
