const path = require("path");

module.exports = {
    resolve: {
        alias: {
            components: path.resolve(__dirname, "./components"),
            views: path.resolve(__dirname, "./views"),
            config: path.resolve(__dirname, "./config"),
            store: path.resolve(__dirname, "./store"),
            client: path.resolve(__dirname, "./client"),
        },
    },
}
