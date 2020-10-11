//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
var email = "";
var first_name = "";
var last_name = "";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first_name,
        LNAME: last_name
      }
    }]
  };
  jdata = JSON.stringify(data);
  var options = {
    url: "", // Enter the url you copied from mailchimps
    method: "POST",
    headers: {
      "Authorization": "Shyam Singhania 025f2c6c74b5ad137b1657ab46b9bd38-us19" // fill the username and api key
    },
    body: jdata
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
  });
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.listen(3000, function() {
  console.log("Starting the Server at Port 3000");
});
