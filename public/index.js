
// Fade out title text on scroll down
$(document).ready(function(){
    $(window).scroll(function(){
      console.log($(window).scrollTop());
      console.log($('.banner-text').height());
      $(".banner-text").css("opacity", 1 - ($(window).scrollTop() *2/ $('.parallax').height()));
    });
});
