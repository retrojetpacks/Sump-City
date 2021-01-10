console.log("Running main.js ");




$(document).ready(function(){
           var a = document.getElementById("svg2");
           console.log("js running doc ready");
           //it's important to add an load event listener to the object, as it will load the svg doc asynchronously
           a.addEventListener("load",function(){
               var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
               var svgRoot  = svgDoc.documentElement;

               //now we can query stuff with jquery like this
               //note that we pass in the svgRoot as the context node!
               //$("foo bar",svgRoot);

               //Select districts by class
               $(".outlines", svgRoot).css("stroke", "red");
               console.log($(".outlines", svgRoot));

               //For coord
               //.getBoundingClientRect()

           },false);
       })
