const express = require("express");
var app = express();
const exphbs = require("express-handlebars");
const cheerio =require("cheerio");
var mongoose = require("mongoose");
const axios = require("axios");
var path = require("path");


var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}:`);
})