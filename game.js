let pattern = [];
let usedPattern = [];
let level = 0;
let gameCheck = false;


function addPattern() {
  let colours = ["red", "blue", "green", "yellow"]
  let pValue = colours[randNum(0, 3)];


  // add pattern to array
  pattern.push(pValue);
}

function playPattern() {
  // takes pattern array
  for (let i = 0; i < pattern.length; i++) {
    let delayTime = i * 800;
    setTimeout(flashSquare, delayTime);
  }
}

function flashSquare() {
  let item = pattern.pop();
  gameCheck = true;

  // pops and removes first item of array
  $("#" + item)
    .animate({
        opacity: 0.2
      },
      200
    )
    .animate({
        opacity: 1
      },
      100
    );

  //animation takes 300 ms
  playSound(item);

  usedPattern.push(item);
  // take the item  removed from pattern and add it to used pattern

  if (pattern.length <= 0) {
    // add the click event once cpu is finished showing the pattern
    createClicks();
  }
} // end flashSquare()

function createClicks() {
  $(".square").click(function() {
    // check if clicked element is the right square
    let item = usedPattern.shift();


    let squareId = $(this).attr("id");

    $(this).animate({
      opacity: 0.2
    }, 200).animate({
      opacity: 1
    }, 100);
    playSound(item);

    // if yes remove from used pattern and add to pattern
    if (item == squareId) {
      //adds item back to pattern array
      pattern.push(item);

      if (usedPattern.length <= 0) {
        level++;
        $("#level").html("Level: " + level);

        removeClicks();
        //user is finished clicking through the pattern successfully
        // add new square to pattern
        addPattern();

        // playPattern();
        setTimeout(playPattern, 800);
      }
    } else {
      // else game over
      playSound("wrong");
      gameCheck = false;
      $("h1").html("Game Over").css({
        fontSize: 58,
        marginBottom: 15,
        paddingTop: 15
      });
      $("p").html("Click anywhere on circle to Restart");
      // clear out pattern arrays
      pattern = [];
      usedPattern = [];
    }
  }); // end .square click
} // end create click

function removeClicks() {
  //removes all events from element
  $(".square").unbind();
}

function startGame() {
  removeClicks();
  resetGame();
  addPattern();
  addPattern();
  playPattern();
  $("p").html("Repeat the secuence of colours").css({
    fontSize: 20,
    marginBottom: 15,
    paddingTop: 20
  });;
}

function resetGame() {
  level = 0;

  $("#level").html("Level: " + level);
  $("h1").html("Simon").css({
    fontSize: 82,
    marginBottom: 0,
    paddingTop: 0
  });
  $("p").html("Click anywhere on circle to Start Game");
}

$("#middleCircle").click(function() {
  if (gameCheck === false) {
    startGame();
  }
});

function randNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;

}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
