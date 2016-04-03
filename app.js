var moment = require("moment");
var path = require("path");
var express = require("express");
var app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/:data", function(req, res){
  var data = req.params.data;
  var myDate;
  if(/^\d{8,}$/.test(data)) {
    myDate = moment(data, "X");
  } else {
    myDate = moment(data, "MMMM D, YYYY");
  }
  
  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(process.env.PORT, process.env.IP, function(err){
  if (err) {
    throw err;
  } else {
    console.log("Server Started");
  }
  
});