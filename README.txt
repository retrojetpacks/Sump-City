npm install
Install all modules in package.json. You will commonly clone a site without all the node modules, then need to get the node modules



Express - route params, dynamic URLs
app.get("/posts/:anything-:anythingelse.:where", function(req,res){
  console.log(req.params.anything);
  console.log(req.params.anythingelse);
  console.log(req.params.where);
});

can access parameters from search address, saved to req.params object
: specifies start of parameter
- and . are interpreted literally


Lodash
