// global variables
var buttonColors = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var keyPressed = 0;
var level = 0;
var isCorrect;

alert("game does not work on phone devices");

// activates game one first key press
$("body").keypress(function(){

  
    keyPressed++;
    if(keyPressed === 1){

        // starts game
        nextSequence();
    }

});

 
// saves user clicks
$(".btn").on("click", function(button){


    // gets id from clicked button
    var userChosenColor = $(button.currentTarget).attr('id');

    // saves user clicked colors
    userClickedPattern.push(userChosenColor);

    //gives animation to clicked color
    animePress(userChosenColor);


    playSound(userChosenColor);


    checkAnswer(userClickedPattern.length-1);
    
});

//generating next sequence
function nextSequence(){

    userClickedPattern = [];
    
    // increases level
    level++;
    $("h1").html(level);
    // generates random number between  0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    //selecting color with random number as id in buttonColors array
    randomChosenColor = buttonColors[randomNumber];

    //push new color to the end of gamePattern array
    gamePattern.push(randomChosenColor);

    //gives flash animation to button with random chosen color
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    

    playSound(randomChosenColor);


    
}

//checks player answer
function checkAnswer(level){
    console.log(level);
    //checks last score
    if(userClickedPattern[level]===gamePattern[level]){
        console.log(userClickedPattern[level]);
        console.log(gamePattern[level]);
        //checks for player pattern length to be same as game pattern
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        else{
            
        }
    }
    else{
        
        wrongAnswer();
    }
}


function wrongAnswer(){
    //plays sound
    var wrongAnswerSong = new Audio('sounds/wrong.mp3');
    wrongAnswerSong.play();
    

    //changes background color for 200ms to red
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    // resets h1 text heading
    $("h1").html("Game Over, Press Any Key to Restart");

    //resets variables for new game 
    level = 0;
    keyPressed = 0;
    gamePattern = [];
    userClickedPattern = [];
}

// plays sound
function playSound(name){
    var song;

    switch (name) {
        case "red":
           song = new Audio('sounds/red.mp3');
           song.play();
           
            break;
        case "blue":
           song = new Audio('sounds/blue.mp3');
           song.play();
            break;
        case "green":
           song = new Audio('sounds/green.mp3');
           song.play();
            break;
        case "yellow":
            song = new Audio('sounds/yellow.mp3');
            song.play();
            break;
        
        default:
            break;
    }
    

}

// adds animation to clicked button
function animePress(currentColor){
    // ads class pressed to button on click
    $("#"+currentColor).addClass("pressed");

    // removes pressed class after 0.1 second
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}