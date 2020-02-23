	// JavaScript code goes here
	var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ball_color;
var x = canvas.width/2;
var y = canvas.height-30;
var width = canvas.width;
var height = canvas.height;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2
var rightPressed = false;
var leftPressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


document.addEventListener ('keydown', function (event){
    console.log (event.which);
}); 

if (annyang) {

  var commands = {

    'hello': function() { alert('Hello world!');},

    'right':  function() {rightKey();},

    'left': function() {leftKey();},

  };

  // Add a command

  annyang.addCommands(commands);


 // start listening for any voice input.

 annyang.start();

  }


  function rightKey() {
rightPressed = true;

  }

  function leftKey() {
    leftPressed = true;
  }


var evt = new KeyboardEvent('keydown', {'keyCode':37, 'which':37});
document.dispatchEvent (evt);


    function keyDownHandler(e) {

      console.log("key down");
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}


function keyUpHandler(e) {

  if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }


}

// set the ball radius. 
ball_size = 10;
var ball_data= {
  firstName: "John",
  lastName: "Doe",
  ballColor: "green",
};

function ball(ball_color) {
ctx.beginPath();
ctx.arc(x, y, ball_size, 0, Math.PI*2);
ctx.fillStyle = ball_color;
ctx.fill();
ctx.closePath();
}

function drawPaddle() {

  ctx.beginPath();
  ctx.rect(paddleX,height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


function hitDetection() {
    if(y+dy < 0 + ball_size || y+dy > height - ball_size ) {

    	dy = -dy;
    }

    if(x+dx > width - ball_size || x+dx < 0 + ball_size ) {
    	dx = -dx;
    }
     x += dx;
    y += dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball("red");
    drawPaddle();
    hitDetection();


    if(rightPressed) {

      paddleX += 7;
      rightPressed = false;

      if(paddleX + paddleWidth > width) {
        paddleX = width - paddleWidth;
      }
    }

    if(leftPressed) {

      paddleX -= 7;
      leftPressed = false;

      if (paddleX < 0) {
       paddleX = 0;

      }
    }




}



// redraw the ball after 10 seconds 
// you then the draw function as this calls the ball. 
setInterval(draw,10);