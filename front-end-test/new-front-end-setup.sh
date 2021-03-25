echo "=> LOG: Initialize package manager"
yarn init -y
echo "=> LOG: Create source folder"
mkdir src
echo "=> LOG: Create public folder"
mkdir public
echo "=> LOG: Add React Library Dependency"
yarn add react react-dom
echo "=> LOG: Adding Babel and Webpack"
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
echo "=> LOG: Creating babel.config.js"
touch babel.config.js
echo "module.exports = { presets: ['@babel/preset-env', '@babel/preset-react' ], }" >> babel.config.js
echo "=> LOG: Adding Babel CLI"
yarn add @babel/cli
# to use run: yarn babel src/index.js --out-file public/bundle.js
echo "=> LOG: Install babel loader"
yarn add babel-loader
echo "=> LOG: Configure Webpack"
touch webpack.config.js
echo "const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), // mesmo que entry: 'src/index.js'
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
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
}" >> webpack.config.js
echo "=> LOG: Add webpack dev server for Live Reloading"
yarn add webpack-dev-server -D
# to run use: yarn webpack serve --mode development
echo "=> LOG: Webpack Adding css-loader style-loader"
yarn add style-loader css-loader
echo "=> LOG: Webpack Assing file-loader"
yarn add file-loader
echo "=> LOG: Add Axios for http requests"
yarn add axios
echo "=> LOG: Addind Babel support for async await"
yarn add @babel/plugin-transform-runtime -D