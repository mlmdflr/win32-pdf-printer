const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { to: "./types", from: "./src/types/index.d.ts" },
        { to: "./", from: "./src/SumatraPDF.exe" },
        { to: "./", from: "./src/paper-size-info.exe" },
        { to: "./", from: "./package.json" },
        { to: "./", from: "./LICENSE" },
      ],
    }),
  ],
  target: "node",
  node: {
    __dirname: false,
  },
};
