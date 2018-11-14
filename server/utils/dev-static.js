const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path");
const proxy = require("http-proxy-middleware");
const asyncBootstrap = require("react-async-bootstrapper");
const ReactDomServer = require("react-dom/server");
const ejs = require("ejs");
const serialize = require("serialize-javascript");
const Helmet = require("react-helmet").default;

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

let serverBundle, createStoreMap;
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
    serverBundle = m.exports.default;
    createStoreMap = m.exports.createStoreMap;
})

const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJSON();
        return result;
    }, {})
}

module.exports = function (app) {
    app.use("/public/", proxy({
        target: "http://localhost:9000"
    }))

    app.get("*", function (req, res) {
        getTemplate().then((template) => {
            const routerContext = {};
            const stores = createStoreMap();
            const app = serverBundle(stores, routerContext, req.url);

            asyncBootstrap(app).then(() => {
                if (routerContext.url) {
                    res.status(302).setHeader("Location", routerContext.url);
                    res.end();
                    return
                }
                const helmet = Helmet.rewind();
                const state = getStoreState(stores);

                const content = ReactDomServer.renderToString(app);

                const html = ejs.render(template, {
                    appString: content,
                    initialState: serialize(state),
                    meta: helmet.meta.toString(),
                    title: helmet.title.toString(),
                    style: helmet.style.toString()
                })
                res.send(html);
                // res.send(template.replace("<!--<app></app>-->", content));
            })
        })
    })
}
