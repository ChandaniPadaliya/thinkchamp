const express = require("express");
var bodyParser = require("body-parser");
const router = require("../route/index");

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.json());
    // app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ "message": "DETING MATCH APIs", health: "100%" });
    });

    app.use("/v1", router);

};