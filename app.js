const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));

const homeContent = ["blah blah"];
const aboutContent = "blah blah blah";
const projectsContent = "blah whale blah";
const contactContent = "blah blah blah blah";



app.get("/", function(req,res){
  res.render("home", {content: homeContent});
});

app.get("/about", function(req,res){
  res.render("about", {content: aboutContent});
});

app.get("/projects", function(req,res){
  res.render("projects", {content: projectsContent});
});

app.get("/contacts", function(req,res){
  res.render("contacts", {content: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose", {content: contactContent});
});



app.post("/compose", function(req,res){
  let postTitle = req.body.newPostTitle;
  let post = req.body.newPost;

  homeContent.push(postTitle);
  homeContent.push(post);

  res.redirect("/compose");
});


app.listen(3000, function(){
  console.log("DR JH running on port 3000");
});


//How to set this up...
//npm init
// npm install express
//nodemon server.js            //It's that easy
