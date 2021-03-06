const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const session = require("express-session");

const isDev = process.env.NODE_ENV === "development";
const serverRender = require("./utils/server-render");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    maxAge: 10 * 60 * 1000,
    name: "tid",
    resave: false,
    saveUninitialized: false,
    secret: "nginx mobx"
}))

app.use(favicon(path.join(__dirname, "../favicon.ico")));

app.use("/api/user", require("./utils/handle-login"));
app.use("/api/", require("./utils/proxy"));

if (!isDev) {
    const template = fs.readFileSync(path.join(__dirname, "../dist/server.ejs"), "utf8");
    const serverEntry = require("../dist/server-entry");
    app.use("/public", express.static(path.join(__dirname, "../dist")));
    app.get("*", function (req, res, next) {
        serverRender(serverEntry, template, req, res).catch(next)
    })
} else {
    const devStatic = require("./utils/dev-static");
    devStatic(app);
}

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
})

app.listen(3333, function () {
    console.log("server is listeng on 3333");
})
