$( ".btn" ).click(function() {
  $( this ).toggleClass("green");
});


function playerName(z){
var z = bootbox.prompt("Let's set your playername", function display(z) {
  if (z != null) {
      document.getElementById("playername").innerHTML = z;
      localStorage.playername = z;
      
      dis(z);
  }
  else
      document.getElementById("playername").innerHTML = "thankyou";
})
};
function dis(arg) {
  bootbox.alert("Player name set to " + arg);
}
document.getElementById("playername").innerHTML = localStorage.playername;
// document.getElementById("highscore").innerHTML = localStorage.highscore;
document.getElementById("highscore").innerHTML = localStorage.highscore;