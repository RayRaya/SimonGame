var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var numClick = -1;

$(".btn").click(function(userChosenColor) {
  numClick++;
  var color = userChosenColor.target.id;
  checkAnswer(color);
});

$(document).keydown(function() {
  if (level <= 0) {
    nextSequence();
  }
});

function checkAnswer(color) {
  userClickedPattern.push(color);
  if (color === gamePattern[numClick]) {
    playSound("sounds/" + color + ".mp3")
    $("#" + color).addClass("pressed");
    setTimeout(function() {
      $("#" + color).removeClass("pressed");
    }, 100);

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
        numClick = -1;
      }, 1000);
    }
  } else {
    $("h1").text("Game Over! Press any key to restart.");
    playSound("sounds/wrong.mp3");
    $("." + color).addClass("game-over");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("." + color).removeClass("game-over");
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  }
}

function startOver(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  numClick = -1;
}


function nextSequence() {
  var randomNumber = Math.floor((Math.random()) * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  clickAnimation(randomChosenColor);
  var soundFilePath = "sounds/" + randomChosenColor + ".mp3";
  playSound(soundFilePath);
  level++;
  $("#level-title").text("Level " + level);
}

function clickAnimation(id) {
  $("#" + id).fadeOut(50).fadeIn(50);
}

function playSound(soundFile) {
  var audio = new Audio(soundFile);
  audio.play();
}
