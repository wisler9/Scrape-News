const express = require("express");
var app = express();
const exphbs = require("express-handlebars");
const cheerio =require("cheerio");
var mongoose = require("mongoose");
const axios = require("axios");
var path = require("path");
var News = require("./models/news.js");
var Memo = require("./models/memo.js");

var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on("error", function(err){
  console.log(err);
});

app.get("/", function(req,res){
  News.find({"saved": false}, function(err,data){
    var hbsObject = {
      article: data
    };
    console.log(hbsObject);
    res.render("index",hbsObject);
  })
})

app.get("/saved", function(req,res){
  News.find({"saved": true}, function(err, data){
    var hbsObject = {
      article: data
    };
    // console.log(hbsObject);
    res.render("saved",hbsObject);
  })
})


app.get("/scrape", function(req,res){
  // using axios to scrape the news
  axios.get("https://www.nytimes.com/section/world").then(function(response){
    const $ = cheerio.load(response.data);

    $(".main-content").find("article").find(".info").each(function(i, element){
      var result = {};
      var headline = $(element).find(".info-header").find("h2").find("a").text();
      var link = $(element).find(".info-header").find("h2").find("a").attr("href");
      var summary = $(element).find(".content").find(".dek").find("a").text();

      result.headline = headline;
      result.link = link;
      result.summary = summary;
      
      var news = new News(result);

      if (headline !== ''){
        news.save(function(err, doc){
          if (err) console.log(err);
          else  console.log(doc);
        })
      }
      // console.log(result);
    });
    // console.log(result);
    res.send("scrape complete");
  });
})

app.post("/news/save/:id", function(req, res){
  News.findOneAndUpdate({"_id": req.params.id}, {"saved": true})
    .then(function(err, data){
      if (err) console.log(err);
      else  res.send(data);
    })
})



app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}:`);
})

module.exports = app;