const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path");
const proxy = require("http-proxy-middleware");
const serverRender = require("./server-render");
const chalk = require("chalk");

const serverConfig = require("../../build/webpack.config.server");

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:9000/public/server.ejs").then(res => {
            resolve(res.data)
        })
            .catch(reject)
    })
}

const NativeModule = require("module");
const vm = require("vm");

// (function(exports, require, module, __filenamem _direname){...bundle code})
const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} };
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper, {
        filename,
        displayErrors: true
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
}

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.log(warn));
    const budlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    const bundle = mfs.readFileSync(budlePath, "utf-8");

    // 无法使用require的方式引用包
    const m = getModuleFromString(bundle, "server-entry.js");
    serverBundle = m.exports;
})

module.exports = function (app) {
    app.use("/public/", proxy({
        target: "http://localhost:9000"
    }))

    app.get("*", function (req, res, next) {
        if (!serverBundle) {
            console.log(chalk.red("serverBundle is not defined, please run dev:client"));

            return res.send("waiting for compile");
        }
        getTemplate().then((template) => {
            return serverRender(serverBundle, template, req, res)
        }).catch(next)
    })
}
