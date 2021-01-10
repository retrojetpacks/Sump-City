const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //For word processing
const mongoose = require("mongoose");
const svgo = require("svgo");
const fs = require('fs');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// //==== Clean svg image ====//
// SVGO = new svgo({
//   plugins: [{
//     convertStyleToAttrs: true,
//     removeStyleElement: true,
//     removeUselessStrokeAndFill: true,
//   }]
// });
//
// const filePath = __dirname + "/public/images/sump-city-outlines.svg"
//
// fs.readFile(filePath, 'utf8', function(err, data) {
//   if (err) {
//     throw err;
//   }
//   SVGO.optimize(data, {
//     path: filePath
//   }).then(function(result) {
//     console.log(result);
//     fs.writeFile(filePath, data, 'utf8',function(err){
//       if (err){
//         console.log(err);
//       }
//     })
//   });
// });




// ============= DB Setup =================//
mongoose.connect("mongodb://localhost:27017/sumpDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//District names from SVG
const districtSchema = new mongoose.Schema({
  name: String,
  owner: String,
  type: String
});

//Campaign Gangs
const gangSchema = new mongoose.Schema({
  name: String,
  faction: String,
  player: String,
  colour: String
});

//Territory name and rules
const territorySchema = new mongoose.Schema({
  name: String,
  rules: String
});

const District = mongoose.model("District", districtSchema);
const Gang = mongoose.model("Gang", gangSchema);
const Territory = mongoose.model("Territory", territorySchema);


const solarFlares = new Gang({
  name: "The Solar Flares",
  faction: "Escher",
  player: "Jack H",
  colour: "#992288"
});






// ============== Pages ===============//
app.get("/", function(req, res) {

  res.render("home");
});




//Receive blog post from compose
app.post("/", function(req, res) {
  // const post = new Post({
  //   title: req.body.newPostTitle,
  //   content: req.body.newPostBody
  // });
  // post.save("/", function(err, doc) {
  //   res.redirect("/");
  // });
});



//Setup district database
app.get("/districts", function(req, res) {
  console.log("Districts");

  const fname = "/public/images/sump-city-outlines2.svg"

  let svg = fs.readFileSync(__dirname + fname, 'utf8');
  let svgs = _.split(svg, 'inkscape:connector-curvature="0"\n       id="');

  svgs.shift(); //remove svg header

  svgs.forEach(function(elem) {
    const districtName = _.split(elem, '"\n       d=')[0];
    console.log(districtName);

    District.updateOne({
        name: districtName
      }, {
        name: districtName
      }, {
        upsert: true
      },
      function(err) {
        if (err) {
          res.send(err);
        } 
      });
  });
});



app.listen(3000, function() {
  console.log("Sump City running on port 3000");
});


//Extensions>stylesheet>merge styles
//comment out style tag in .svg
