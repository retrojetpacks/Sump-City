const express = require("express");
const bodyPaerser = requre("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));

const homeContent = "blah blah";
const aboutContent = "blah blah blah";
const contactContent = "blah blah blah blah";



// app.get("/", function(req,res){
//   console.log(req);
//   res.sendFile(__dirname+"/public/index.html");
// });



app.listen(3000, function(){
  console.log("DR JH running on port 3000");
});


//How to set this up...
//npm init
// npm install express
//nodemon server.js            //It's that easy
