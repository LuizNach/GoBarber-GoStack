echo "=> LOG: Initialize package manager"
yarn init -y
echo "=> LOG: Create source folder"
mkdir src
echo "=> LOG: Create public folder"
mkdir public
echo "=> LOG: Create React App"
yarn add react react-dom
echo "=> LOG: Adding Babel"
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
echo "=> LOg: Creating babel.config.js"
touch babel.config.js
echo "module.exports = { presets: ['@babel/preset-env', '@babel/preset-react' ], }" >> babel.config.js
echo "=> LOG: Adding Babel CLI"
yarn add @babel/cli
# to use run: yarn babel src/index.js --out-file public/bundle.js