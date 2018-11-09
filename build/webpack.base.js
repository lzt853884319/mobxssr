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
    }
}

module.exports = config;
