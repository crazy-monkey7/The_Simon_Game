var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

if (typeof window !== "undefined" && window.HTMLAudioElement) {
  var audioEl = new Audio();
  audioEl
    .play()
    .then(function () {
      audioEl = null;
    })
    .catch(function (error) {
      console.log(error);
    });
}

var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var yellow = new Audio("sounds/yellow.mp3");

function playSound(name) {
  switch (name) {
    case "blue":
      blue.play();
      break;
    case "green":
      green.play();
      break;
    case "red":
      red.play();
      break;
    case "wrong":
      wrong.play();
      break;
    case "yellow":
      yellow.play();
      break;
    default:
      break;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      $("#level-title").text("Game Over, Tap Anywhere to Restart");
    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  console.log("Game restarted.");
}

$(document).keypress(function () {
  if (!started) {
    started = true;
    console.log("Game started.");
    nextSequence();
  } else {
    if ($("#level-title").text() === "Game Over, Press Any Key to Restart") {
      startOver();
      nextSequence();
    }
  }
});

$(document).on("touchstart", function () {
  if (!started) {
    started = true;
    console.log("Game started.");
    nextSequence();
  } else {
    if ($("#level-title").text() === "Game Over, Press Any Key to Restart") {
      startOver();
      nextSequence();
    }
  }
});
