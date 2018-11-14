const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = webpackMerge(baseConfig, {
    mode: "development",
    target: "node",
    entry: {
        app: path.join(__dirname, "../client/server-entry.js")
    },
    // 指定某些包不打包到dist
    externals: Object.keys(require("../package.json").dependencies),
    output: {
        filename: "server-entry.js",
        path: path.join(__dirname, "../dist"),
        publicPath: "/public",
        libraryTarget: "commonjs2"
    }
})
