$( ".btn" ).click(function() {
  $( this ).toggleClass("green");
});


function playerName(z){
var z = bootbox.prompt("Let's set your playername", function display(z) {
  if (z != null) {
      document.getElementById("playername").innerHTML = "Player: " + z;
      localStorage.playername = z;
      
      dis(z);
  }
  else
      document.getElementById("playername").innerHTML = "thankyou";
});
}
function dis(arg) {
  bootbox.alert("Player name set to " + arg);
}
if(localStorage.playername === undefined) {
  document.getElementById("playername").innerHTML = "Player 1";
} else {
  document.getElementById("playername").innerHTML = localStorage.playername;
}
if(localStorage.highscore === undefined) {
  document.getElementById("highscore").innerHTML = "0";
} else {
document.getElementById("highscore").innerHTML = localStorage.highscore;
}