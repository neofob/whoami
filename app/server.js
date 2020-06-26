"use strict";

const os = require("os");
const express = require("express");
const got = require("got");

const PORT = 5000;
const HOST = "0.0.0.0";

const app = express();
const hostname = os.hostname();

app.get("/", (req, res) => {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`handling request from ${ip}`);
    res.json({
        ip: ip,
        hostname: hostname,
        headers: req.headers,
        environment: process.env
    });
});

app.get("/fetch", (req, res) => {
    var url = req.query.url;
    console.log(`requesting url ${url}`);

    got(url).then(success => {
        res.json({
            url: url,
            response: success.body
        });
    }).catch(error => {
        console.log(error);
        res.json({
            url: url,
            response: error.body
        });
    });
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
