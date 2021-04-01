echo "=> LOG: Initialize package manager"
yarn init -y
echo "=> LOG: Add Express and types as dev dependency"
yarn add express
yarn add @types/express -D
echo "=> LOG: Add Typescript as dev dependecy"
yarn add typescript -D
echo "=> LOG: Initialize typescript project - Add ts config json file"
yarn tsc --init
# to convert automatically ts files into js run: yarn tsc
echo "=> LOG: Added watch server addon"
yarn add ts-node-dev -D
