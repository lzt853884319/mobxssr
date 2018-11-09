const path = require("path");

const config = {
    mode: "development",
    output: {
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
    resolve: {
        alias: {
            components: path.resolve(__dirname, "../client/components"),
            views: path.resolve(__dirname, "../client/views"),
            config: path.resolve(__dirname, "../client/config"),
            store: path.resolve(__dirname, "../client/store"),
            client: path.resolve(__dirname, "../client")
        },
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    }
}

module.exports = config;
