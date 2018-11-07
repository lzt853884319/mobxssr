const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "../client/app.js")
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.join(__dirname, "../dist"),
        publicPath: "/public"
    },
    module: {
        rules: [
            {
              test: /.(js|jsx)$/,
              loader:"babel-loader"
            }
          ]
    },
    plugins: [
        new HTMLPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../client/template.html"),
        })
    ]
}