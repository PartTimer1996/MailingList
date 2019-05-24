//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

var request = require('request');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req,res){
  var surname = req.body.last;
  var forename = req.body.first;
  var email =  req.body.mail;

  var data = {
    members: [
      {email_address: email,
        merge_fields: {
        FNAME: forename,
        LNAME: surname,
      },
      status: "subscribed",
     }
    ]
  };

  var jsonData =JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/9ddab2c87f",
    method: "post",
    headers: {
      "Authorization": "rduffy1 b97be9895bb000e7b2a222fe3a4d1b93-us20"
    },
    body: jsonData
  };


  request(options, function(error, response, body){
    if (error){
       console.log(error);
       res.sendFile(__dirname + "/failure.html");
    } else{
      if(response.statusCode === 200)
      {
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
  }
});

});

app.post("/failure", function (req,res){
  res.redirect("/");
});

app.post("/success", function (req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
console.log("Server running on port 3000");
});


// API Key b97be9895bb000e7b2a222fe3a4d1b93-us20
// Atom ID 9ddab2c87f
