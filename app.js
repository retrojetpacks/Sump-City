const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash"); //For word processing

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public/'));

const aboutContent = "blah blah blah";
const projectsContent = "blah whale blah";
const contactContent = "blah blah blah blah";

const blogPosts = [];

function parse(str) {
  return lodash.replace(lodash.toLower(str), '-', '');
}


app.get("/", function(req, res) {
  res.render("home", {
    content: blogPosts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    content: aboutContent
  });
});

app.get("/projects", function(req, res) {
  res.render("projects", {
    content: projectsContent
  });
});

app.get("/contacts", function(req, res) {
  res.render("contacts", {
    content: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {
    content: contactContent
  });
});

//Example of express route params
app.get("/posts/:anything-:anythingelse.:where", function(req, res) {
  console.log(req.params.anything);
  console.log(req.params.anythingelse);
  console.log(req.params.where);
});

app.get("/posts/:postName", function(req, res) {
  let reqTitle = parse(req.params.postName);

  console.log(reqTitle);

  // Challenge: word proc into lowercase pure string
  blogPosts.forEach(function(post) {
    if (parse(post.title) === reqTitle) {
      console.log("Match found: " + req.params.postName);
    } else {
      console.log("Not a match");
    }
  });
  res.redirect("/");

});


app.post("/compose", function(req, res) {
  const post = {
    title: req.body.newPostTitle,
    content: req.body.newPostBody
  };
  blogPosts.push(post);

  res.redirect("/");
});


app.listen(3000, function() {
  console.log("DR JH running on port 3000");
});


//How to set this up...
//npm init
// npm install express
//nodemon server.js            //It's that easy
