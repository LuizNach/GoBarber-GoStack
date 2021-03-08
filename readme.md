# Project GoBarber

This project is meant to be an exercise for creating a small service to a barbershop where we use NodeJs for the the Back-End, React fro the Front-End and React Native for a mobile app.

# Back-end pure javascript

## Install [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install#debian-stable)

Ubuntu 17+

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install --no-install-recommends yarn
```

[cmdtest bug](https://github.com/Joystream/helpdesk/issues/16)

## Initiate the project

```bash
mkdir back-end
cd back-end/
yarn init -y
```

## Install express as a dependecy

```bash
yarn add express
```

## Install a development work flow

Install a constant listener to our updates. Every time we save we don't need to run `node src/index.js` constantly. Is we install nodemon, every time we hit save, nodemon will understand that it will need to re run the node application.

```bash
yarn add nodemon -D
```

The `-D` flag is use for development only dependencies. This way we won't need it to a final deploy of the application.

To start a server we can use `yarn nodemon src/index.js` or we can edit the `main` parameter of the package.json to `src/index.js` and just run every time `yarn nodemon`

# Back-end with typescript

## Install typescript as a development dependency

```bash
cd back-end/
yarn add -D typescript
```

## Install express as a dependency

```bash
yarn add express
```

Certain modules are not ready to declare types for typescript, for instance the express module has three dots on the module import: “You cannot find a find a declaration file for a module”. So to adapt to the the declaration types he implement a new file that has the declaration of any variable used on the module. We can install that to solve any declaration problems using:

```bash
yarn add @type/name_of_module
```

For instance the express module:

```bash
yarn add @types/express -D
```

## Converting/Compiling

Our ts code won’t run on node because node only understands js. When we installed ts one of the packages adquired on the node modules is hte tcs. Tsc will allow us to transpile ts into js.

```bash
yarn tsc src/index.ts
```

Some ts options can be configured. For example express uses ‘export default’ expression which ts can transform it properly unless you edit the configuration `esModuleInterop` flag. We can generate the configuration file using:

```bash
yarn tsc --init
```

After you initialized the tsconfig.json, you won’t need to compile each file by hand. You can run:

```bash
yarn tsc
```

It will compile all files into ts files.
Editing the “outDir” field on the tsconfig.json we will change the location where the compiled files are generated so we don’t have them mixed if the other files.

```tsx
"outDir": "./dist",
```

## Creating a development flow with typescript application

We want to save each file and automatically recompile the files so we can run it or even better: save and compile while we are running it.

Babel, ts-node-dev and Sucrase have that functionality ( sucrase doesn’t support decorators so we are not going to use it for now)

For this project we are going to use the [ts-node-dev](https://www.npmjs.com/package/ts-node-dev):

```bash
yarn add ts-node-dev -D
```

On our package.json we are going to create a dev script adding:

```json
    "scripts": {
        "dev:server" : "ts-node-dev --respawn -- transpileOnly src/index.ts",
    }
```

## URL Parameters

The parameters we can receive at the end-pint access can be:

- Query parameters: use to filters and pagination

```jsx
// base_url/projects?title="something"&owner="anotherthing"
app.post('/projects', ( request, response ) => {

    const { title, owner } = request.query;

		console.log(request.query);
    console.log("Title", title);
    console.log("Owner", owner);

    return response.json([
        "project 1",
        "project 2",
    ]);
});
```

- Route params: use to identify resource ( update/ delete)

```jsx
// base_url/projects/3
app.put('/projects/:id', ( request, response ) => {

    const params = request.params;

    console.log(request.params);
    console.log("Id", params.id);

    return response.json([
        "project 1",
        "project 2",
    ]);
});
```

- Request Body: content used to create or edit some resource

```jsx
const express = require('express');

const app = express();

app.use(express.json()); // express needs to understand that it's going to received the json pattern on it's payloads.

app.get('/projects', ( request, resp ) => {

    const body = request.body;

    console.log(body);
}
```

## Middleware

A middle ware is a requisitions interceptor which interrupts a requisition or changes the data on a requisition.

We usually use middle wares when we want to trigger a peace of code automatically when a route is called. Even our route functions can be considered a middleware because they intercept a request and run a piece of code to treat the request but we can create functions to run before or after  our route functions.

- Triggering a function every time before a route functions:

```jsx
const express = require('express');

const app = express();

// we want to call this function everytime before any route function
// Every middleware has 3 params: request, response and next
function LogRequests( request, response, next) {

    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); // Using the next middleware: this will call the routes

}

const app.use(LogRequests);
// This will make the LogRequest function trigger before any route function of app
// We can set to use as many function before routes using app.use(function1, function2, function3)

app.get('/', () => {
	const mystring = "this is a route function";
	return response.send(mysrting);
});
```

- We can trigger middlewares specifically before some routes when we set the order of functions to be called:

```jsx
const express = require('express');

const app = express();

function function1( request, response, next) { console.log("this is the function1"); return next();}

function function2( request, response, next) { console.log("this is the function2"); return next();}

function function3( request, response, next) { console.log("this is the function3"); return next();}

app.get('/', function1, function2, function3,() => {
	const mystring = "this is a route function";
	return response.send(mysrting);
}); // this way every time this route is called, the functions will be triggered on this sequence.
//To keep the chain of middlewares the functions must always finish calling the 'next' method.
```

## Creating the Front-end

In order to create our front-end we are going to crate a repository following the same guide lines as the back-end:

```bash
mkdir front-end
cd front-end
yarn init -y
```

We are using React (library we permit us use components and jsx on our application) and React-Dom (library which permits react to connect with the dom-tree):

```bash
yarn add react react-dom
```

Up to now the web browsers don't  recognize anything different from html, css and java script. React actually insert html inside the js and that is not recognized naturally by the browsers up to now. So we must be able to convert any library language into those accepted by the browser. In order to do that, we are going to user Babel, Webpack, Loaders.

## Babel and Webpack configuration

[Babel](https://babeljs.io/) is  a converter/transpiler of react code to some code the browser can understand. Webpack, responsible for converting properly files (.js, .css, .png) to be used inside java-script because each file needs a proper converter. Loaders is a concept of how we are going to treat specifically each type of code to convert. For instance if we have a js file of react code er are using a babel-loader (any js to js used on any type of browser - retro compatibility), css-loader, image-loader, etc. Any *-loader will be used by the webpack to give a proper meaning to js used on the web browser.

```bash
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
```

[Babel](https://babeljs.io/) uses a core engine we must configure before using it but `@babel/preset-env`( look at the browsers on the environment and will just convert functionalities that they don't understand yet ) and `@babel/preset-react` ( add the react functionalities on the babel conversion ) are third party packs we can use as our babel configuration so we don't have to go deep on that issue but feel free to explore the documentation. To activate those packs we must create a `babel.config.js` on the root like this:

```jsx
module.export = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ]
}
```

We can use babel through the command line interface using:

```bash
yarn add @babel/cli
```

Using the command line interface we can see how babel will change a js code into a version which the environment browsers will understand. For example use this command line to convert `src/index.js`:

```bash
yarn babel src/index.js --out-file public/bundle.js
```

Now you can see what type of js your default browser understand on the `bundle.js`.

Now that we configured babel we must configure the webpack. Inside our js files we want to be able to import .html, .css, .png and that will be possible once we prepare the webpack to trigger our loaders. For instance we can configure the webpack to trigger automatically the babel-loader to convert our files to a proper js our default browser can understand. We will create `webpack.config.js`.

```jsx
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename:'bundle.js',
	}
	module: {}
}
```

`path` is a node library which gives us access to the folder tree. Instead of using directly 'src/index.js' we use the path library to avoid problems caused when we want to use the application on different OS which may use '\' instead of '/'.

`entry` is the entry file that will be triggered our application. The first file that will be loaded by the webpack.

`path` is the folder where we are going to save the converted files from our loaders.

`filename` is the name of the file generated with all the conversions the webpack will trigger.

Our loaders will be defined on the `module` field. The `rules` array field inside `module`, will determine the proper loaders for each situation. Each object inside the list of rules is a different loader.

Let's install a loader:

```bash
yarn add babel-loader
```

And we set to use it:

```jsx
module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
```

`rules` is the list of objects that are configurations of a loader.

`test` is the regular expression that will find the files needed to be converted.

`exclude` is the regex of the folder names to be excluded from the search of files to convert.

`use` is the name of the loader which will be triggered.

Now we can check if the webpack is capable of triggering the conversion running:

```bash
yarn webpack --mode development
```

Checking the `public/budle.js` we can see that there is much more converted. We don't to run this command every time we make a change on the front-end and to avoid that we will install another webpack that keeps running like a server to watch all the changes:

```bash
yarn add webpack-dev-server -D
```

To add this on the configuration add `devServer` to the initial object of the webpack:

```jsx
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename:'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
}
```

`contentBase` is the path to the folder which contain the public files of the application like the `bundle.js` or `index.html`.

Now when we run:

```bash
yarn webpack-dev-server --mode development
```

Now our terminal work like the nodejs server, always be checking for changes. It's the Live reloading.

## Components

## Following the MVC pattern

Separating our routes is a good start: back-end/routes.ts
After that we are going to create a controller: