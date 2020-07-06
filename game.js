// Array containing colors
var buttonColors = ["red", "blue", "green", "yellow"];

//Empty Array
var gamePattern = [];

//User click pattern
var userClickedPattern = [];

// game Start
var started = false;

//Seperate variable for level number
var level = 0;

// First time keypress detection
$(document).keydown(function() {
  if (started != true) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Mouse click event listener
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;                                  //storing id of button which is clicked by user
  userClickedPattern.push(userChosenColor);                               //pushing id of button clicked in userClickedPattern array

  playSound(userChosenColor);                                             //play Sound on buttonn click
  animatePress(userChosenColor);                                          //Animate on button click

  checkAnswer(userClickedPattern.length-1);                               //Passing the last index number of userClickedPattern as a parameter
});

//Function for Checking user's pattern against game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {   //most recent value of user patter equals to game patter ?
    if (userClickedPattern.length === gamePattern.length) {               //length of user's pattern is equal to game patter ?
      setTimeout(function() {
        nextSequence();                                                    // calling nextSequence function in 1 second
      }, 1000);
    }
  } else {
    playSound("wrong");                                                   // if user pattern not equals to game patter then play wrong.mp3
    $("h1").text("Game Over, Press Any Key to Restart");                  // and change h1 text

    $("body").addClass("game-over"); //adding class to clicked button     // add class game-over and then remove in 200 miliseconds

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startover();                                                          //game reset
  }
}

//Function for generating game patter
function nextSequence() {
  userClickedPattern = [];                                                //Reset user sequence, when nextSequence() is called
  level++;                                                                //increase level by one
  $("h1").text("Level " + level);                                         //change h1 text

  var randomNumber = Math.floor(Math.random() * 4);                       // Generating random numbers between zero to three
  var randomChosenColor = buttonColors[randomNumber];                     // Storing random color
  gamePattern.push(randomChosenColor);                                    // pushing random color to an empty array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);                    // Animating random color which is generated from randomChosenColor
  playSound(randomChosenColor);                                           //calling function playSound

}

//Seperate function for playing sounds of randomly chosen color
function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");                  // storing path of selected button's audio
  colorSound.play();                                                      //play audio
}

// Animate button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");                             //adding class to clicked button

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");                       // removing class to clicked button after 100 miliseconds
  }, 100);
}

//Function to reset game
function startover() {
  level = 0;                                                            //reset game level
  gamePattern = [];                                                     //reset game pattern
  started = false;                                                      //reset game started value
}
