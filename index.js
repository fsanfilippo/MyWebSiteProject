var mongo = require('mongodb');
var express = require('express');
var path    = require("path");
var monk = require('monk');
var db =  monk('localhost:27017/mydb');
var app = new express();

app.use(express.static(__dirname + '/views'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/helloWord.html'));
});

app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});


app.listen(3000)