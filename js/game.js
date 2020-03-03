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
var paddleWidth = 200;
var paddleX = (canvas.width-paddleWidth)/2
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score =0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status:1};
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


document.addEventListener ('keydown', function (event){
}); 

function talkKey() {
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
}

talkKey();

  function rightKey() {
rightPressed = true;
console.log("right");

  }

  function leftKey() {
    leftPressed = true;
    console.log("left");
  }


var evt = new KeyboardEvent('keydown', {'keyCode':37, 'which':37});
document.dispatchEvent (evt);


    function keyDownHandler(e) {

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



function gameOverScreen() {


    if (y + dy > height - ball_size) {

   

   // what happens when the ball hits the paddle
   if(x > paddleX && x < paddleX + paddleWidth) {
  
  // reverse the direction
  dy = -dy;
   }
   else {

    alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
   }



      

    }


}

function drawScore() {

  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);

}

function CollisionBrickDetection() {

  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
       if(b.status == 1) {

      if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
           dy = -dy;

          b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {

              alert("YOU WIN, CONGRATULATIONS");
              document.location.reload();
              clearInterval(interval);
            }

           
      }
    

    }


    }
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

function drawBlocks() {
for(var c=0; c<brickColumnCount; c++) {
  for(var r=0; r<brickRowCount; r++) {
    // only show blocks if status 1 is displayed 
    if(bricks[c][r].status == 1) {
  var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
  var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
bricks[c][r].x = brickX;
bricks[c][r].y = brickY;
ctx.beginPath();
ctx.rect(brickX, brickY,brickWidth,brickHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
}
  }
}




function hitDetection() {
    if(y+dy < 0 + ball_size) {

    	dy = -dy;
    } 

    if(x+dx > width - ball_size || x+dx < 0 + ball_size ) {
    	dx = -dx;
    }

    gameOverScreen();


     x += dx;
    y += dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball("red");
    drawPaddle();
    hitDetection();
    drawBlocks();
    drawScore();
    CollisionBrickDetection();
 
    if(rightPressed) {

      paddleX += 50;
      rightPressed = false;

      if(paddleX + paddleWidth > width) {
        paddleX = width - paddleWidth;
      }
    }

    if(leftPressed) {

      paddleX -= 50;
      leftPressed = false;

      if (paddleX < 0) {
       paddleX = 0;

      }
    }




}



// redraw the ball after 10 seconds 
// you then the draw function as this calls the ball. 
var interval = setInterval(draw,10);