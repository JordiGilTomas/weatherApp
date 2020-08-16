const path = require('path');


module.exports = {
    // mode: 'development',
    entry: ['./node_modules/regenerator-runtime/runtime.js', './src/public/js/controller/index.js'],
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
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/,
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                }],
            },
        ],
    },
};
