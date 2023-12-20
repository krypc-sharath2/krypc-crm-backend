var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var CompanyRouter = require("./companies")
var marketRouter = require("./markets")
var pillarRouter = require("./pillars")

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/companies/",CompanyRouter);
app.use("/marketResearch/",marketRouter);
app.use("/pillars/",pillarRouter);

module.exports = app;