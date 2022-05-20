# import-meta-env-webpack-plugin

Similar to webpack.EnvironmentPlugin, but for the `import.meta.env` object.

[![CI](https://github.com/iendeavor/import-meta-env-webpack-plugin/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env-webpack-plugin/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/import-meta-env-webpack-plugin.svg)](https://www.npmjs.com/package/import-meta-env-webpack-plugin)

## Installation

```sh
npm install --save-dev import-meta-env-webpack-plugin
```

## Usage

The `ImportMetaEnvWebpackPlugin` accepts either an array of keys or an object mapping its keys to their default values.

```js
const {
  ImportMetaEnvWebpackPlugin,
} = require("import-meta-env-webpack-plugin");

new ImportMetaEnvWebpackPlugin(["NAME", "DEBUG"]);
```

This is equivalent to the following `DefinePlugin` application:

```js
new webpack.DefinePlugin({
  "import.meta.env.NAME": JSON.stringify(process.env.NAME),
  "import.meta.env.DEBUG": JSON.stringify(process.env.DEBUG),
});
```

> Not specifying the environment variable raises an "`EnvironmentPlugin` - `${key}` environment variable is undefined" error.

## Usage with default values

Alternatively, the `ImportMetaEnvWebpackPlugin` supports an object, which maps keys to their default values. The default value for a key is taken if the key is `undefined` in `process.env`.

```js
new ImportMetaEnvWebpackPlugin({
  NAME: "world", // use 'world' unless process.env.NAME is defined
  DEBUG: false,
});
```

> Variables coming from `process.env` are always strings.

> Default values of `null` and `undefined` behave differently. Use `undefined` for variables that must be provided during bundling, or `null` if they are optional.

### Example

Let's investigate the result when running the previous `ImportMetaEnvWebpackPlugin` configuration on a test file `entry.js`:

```js
if (import.meta.env.NAME === "webpack") {
  console.log("Welcome to webpack");
}
if (import.meta.env.DEBUG) {
  console.log("Debugging output");
}
```

When executing `NAME=webpack webpack` in the terminal to build, `entry.js` becomes this:

```js
if ("webpack" === "webpack") {
  // <-- 'webpack' from NAME is taken
  console.log("Welcome to webpack");
}
if (false) {
  // <-- default value is taken
  console.log("Debugging output");
}
```

Running `DEBUG=false webpack` yields:

```js
if ("world" === "webpack") {
  // <-- default value is taken
  console.log("Welcome to webpack");
}
if ("false") {
  // <-- 'false' from DEBUG is taken
  console.log("Debugging output");
}
```

See [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) for more details.
