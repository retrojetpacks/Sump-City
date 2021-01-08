const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //For word processing
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js"); //My custom date module

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public/'));

let today = date.getDay();


// Handy functions - need to extract to module
function parse(str) {
  return _.replace(_.toLower(str), '-', '');
}

function nChars(str, n) {
  return str.substring(9, n);
}


// ============= DB Setup =================//
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const blogSchema = new mongoose.Schema({
  title: String,
  //2021-01-07
  //date: Date,
  content: String
});

const Post = mongoose.model("Blog", blogSchema);

const welcome = new Post({
  title: "Welcome!",
  content: "This is a simple blog website that I made during my web development course. It uses templating with EJS and saves blog posts to a Mongo database."
});






// ============== Pages ===============//

app.get("/", function(req, res) {
  Post.find({}, function(err, foundPosts) {
    if (err) {
      console.log("No posts found!");
    } else {
      res.render("home", {
        content: foundPosts
      });
    };
  });
});

app.get("/about", function(req, res) {
  res.render("about", {});
});

app.get("/projects", function(req, res) {
  res.render("projects", {});
});

app.get("/contacts", function(req, res) {
  res.render("contacts", {});
});

app.get("/compose", function(req, res) {
  res.render("compose", {});
});

// //Example of express route params
// app.get("/posts/:anything-:anythingelse.:where", function(req, res) {
//   console.log(req.params.anything);
//   console.log(req.params.anythingelse);
//   console.log(req.params.where);
// });




//Receive blog post from compose
app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.newPostTitle,
    content: req.body.newPostBody
  });
  post.save("/", function(err, doc) {
    res.redirect("/");
  });
});


app.get("/posts/:postId", function(req, res) {
  //let reqTitle = parse(req.params.postName);
  let reqId = req.params.postId;
  console.log("req Id: " + reqId);

  if (reqId != "index.js") { //hack. Fix this?
    Post.find({
      _id: reqId
    }, function(err, foundPost) {
      if (err) {
        console.log("No posts found!");
      } else {
        res.render("post", {
          blogPost: foundPost[0]
        });
      };
    });
  };
});



app.listen(3000, function() {
  console.log("DR JH running on port 3000");
});


//How to set this up...
//npm init
// npm install express
//nodemon server.js            //It's that easy
