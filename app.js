//jshint esversion: 6
const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");

const app = express();

app.use (bodyParser.urlencoded({extended : true}));

app.use (express.static("public"));

app.get("/" , function(req ,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req , res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.eMail;

  var data = {
    members : [{
      email_address : email ,
      status : "subscribed" ,
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }]
  };

var jsonData = JSON.stringify(data);

  var options = {
    url : "https://us20.api.mailchimp.com/3.0/lists/6b67564928" ,
    method : "POST" ,
    headers : {
      "Authorization" : "Shahariar 95b4aa2ed9b79695825a140a22fb594b-us20"
    } ,
    body : jsonData
  };

  request(options , function(error , response , body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else {
      if(response.statusCode ===200){
        res.sendFile(__dirname + "/sucess.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post ("/failure" , function(req ,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000 , function(){
  console.log("started server at port 3000");
});


//95b4aa2ed9b79695825a140a22fb594b-us20

//6b67564928
