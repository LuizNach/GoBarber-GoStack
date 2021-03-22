/**
 * Babel: Responsavel por converter - transpilar - codigo React para um codigo queo browser entenda.
 * Webpack: Para cada tipo de arquivos (.js, .css, .png) eu vou converter o codigo de uma maneira diferente.
 * 
 * Webpack Loaders: babel-loader, css-loader, image-loader, file-loader.
 */

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), // mesmo que entry: "src/index.js"
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    }
}