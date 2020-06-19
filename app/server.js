"use strict";

const os = require("os");
const express = require("express");

const PORT = 5000;
const HOST = "0.0.0.0";

const app = express()
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

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
