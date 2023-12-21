var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var CompanyRouter = require("./companies")
var MarkertResearchRouter = require("./marketresearch")

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/companies/",CompanyRouter);
// app.use("/marketResearch/",MarketResearchRouter);

module.exports = app;