const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const clientConfig = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "../client/app.js")
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.join(__dirname, "../dist"),
        publicPath: "/public/"
    },
    module: {
        rules: [
            {
              test: /.(js|jsx)$/,
              loaders: "babel-loader"
            },
            {
              enforce: "pre",
              test: /.(js|jsx)$/,
              loaders: "eslint-loader",
              exclude: [
                  path.join(__dirname, "../node_modules")
              ]
            }
            
          ]
    },
    plugins: [
        new HTMLPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../client/template.html"),
        }),
        
    ]
}

if(isDev) {
    clientConfig.entry = {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, "../client/app.js")
        ]
    }
    clientConfig.devServer = {
        host: "0.0.0.0",
        port: 9000,
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        publicPath: "/public/",
        historyApiFallback: {
            index: "/public/index.html"
        }
    };
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = clientConfig;