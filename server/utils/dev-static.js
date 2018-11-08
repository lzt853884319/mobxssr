const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");


const serverConfig = require("../../build/webpack.config.server");

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:9000/public/index.html").then(res => {
            console.log(res.data);
            
            resolve(res.data)
        })
        .catch(reject)
    })
}

const Module = module.constructor;

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.log(warn));
    
    const budlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    
    const bundle = mfs.readFileSync(budlePath, "utf-8");
    const m = new Module();
    m._compile(bundle, "server-entry");
    serverBundle = m.exports.default;

})

module.exports = function (app) {
    app.use("/", proxy({
        target: "http://localhost:9000"
    }))


    app.get("*", function (req, res){
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace("<!--<app></app>-->", appString));
        })
    })
}