const webpack = require("webpack");
const { ImportMetaEnvWebpackPlugin } = require("..");

// const definitions = [
//   "A",
//   "B",
//   "C",
//   "D",
//   //  'E',
//   //  'F',
//   //  'G',
//   //  'H',
// ];
const definitions = {
  A: "a",
  B: true,
  C: null,
  D: undefined,
  E: "e",
  F: true,
  G: null,
  // H: undefined,
};

module.exports = {
  mode: "production",

  plugins: [
    new webpack.EnvironmentPlugin(definitions),
    new ImportMetaEnvWebpackPlugin(definitions),
  ],

  optimization: {
    minimize: false,
  },
};
