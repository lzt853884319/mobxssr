const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const isDev = process.env.NODE_ENV === "development";

const clientConfig = webpackMerge(baseConfig, {
    mode: "development",
    entry: {
        app: path.join(__dirname, "../client/app.js")
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.join(__dirname, "../dist"),
        publicPath: "/public/"
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, "../client/template.html")
        }),
        new HTMLPlugin({
            template: "!!ejs-compiled-loader!" + path.join(__dirname, "../client/server.template.ejs"),
            filename: "server.ejs"
        })
    ]
});

if (isDev) {
    clientConfig.entry = {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, "../client/app.js")
        ]
    }
    clientConfig.devServer = {
        host: "0.0.0.0",
        port: 9000,
        contentBase: path.join(__dirname, "../dist"),
        hot: true,
        publicPath: "/public/",
        historyApiFallback: {
            index: "/public/index.html"
        },
        proxy: {
            "/api": "http://localhost:3333"
        }

    };
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = clientConfig;
