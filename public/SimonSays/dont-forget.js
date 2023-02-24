var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".playButton").click(function () {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
  console.log($(".playButton").css("visibility", "hidden"));
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    $("body").addClass("success");
    setTimeout(function () {
      $("body").removeClass("success");
    }, 100);

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("wrong");
    // setTimeout(function () {
    //   $("body").removeClass("wrong");
    // }, 500);
    $("h1").html(`Game Over <br><br>Levels:${level}`);
    $(".btn").addClass("hide");
  }
}

function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("../../Dont-Forget/sounds/" + name + ".mp3");
  audio.play();
}

const animateButton = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  $("#" + currentColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(currentColor);
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
