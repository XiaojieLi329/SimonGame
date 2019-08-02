var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//Start the game
$(document).keydown(function() {
  if(!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Check Which Button is Pressed
$(".btn").click(function() {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  //console.log(userClickedPattern);
});

//Show the Sequence to the User with Animations and Sounds
function nextSequence() {
  //increase level and update h1
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //flash
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//play audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //level up if correct
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  //Game over if one key is wrong
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
