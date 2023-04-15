var btnColours = ["red","yellow","blue","green"];
var pattern = [];
var userPattern = [];
var level = 0;
function playSound(picksound) {
    var sounds = new Audio("sounds/"+picksound+".mp3")
    return sounds.play();
}

function nextSequence(){
    var randomTile = Math.floor(Math.random()*4);
    var randColour = btnColours[randomTile];
    pattern.push(randColour);
    $("."+randColour).addClass("autopressed")
    setTimeout(function(){
        $("."+randColour).removeClass("autopressed")
    },200); 
    playSound(randColour);
    $("h1").text("Level " + level);
    level++;
    
}
function wrongAnswer() {
    var wrongsound = new Audio("sounds/wrong.mp3")
    wrongsound.play();  
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")
    setTimeout(function(){
    $("body").removeClass("game-over")
    },200)
    level = 0;
}

function  repeatSqeuence(){
    setTimeout(function(){
        nextSequence();
    },1000)
}

$("h1").click(function(){  
    pattern = [];
    userPattern = [];
    level = 0;
    nextSequence();
    $("h2").text("Tap on the tile that blinked");
});

$(document).keypress(function(){  
    pattern = [];
    userPattern = [];
    level = 0;
    nextSequence();
});
function checkAnswer(){
   
var gameLength = userPattern.length - 1;

if(pattern[gameLength] === userPattern[gameLength]){ 
    if(pattern.length === userPattern.length){
        setTimeout(function(){
            nextSequence();
            $("h2").text("Tap on previously tapped tiles and then the blinked tile");
        },1000)
        userPattern=[];
    }
}
else {
    wrongAnswer();
    $("h2").text("You pressed Wrong Tile!!!");
    Pattern = [];
    userPattern = [];
}
}


$(".btn").click(function(){
    var mouseClick = $(this).attr("id");
    userPattern.push(mouseClick);
    $("."+mouseClick).addClass("pressed")
    setTimeout(function(){
        $("."+mouseClick).removeClass("pressed")
    },100); 
     playSound(mouseClick);
     checkAnswer();

}
);

