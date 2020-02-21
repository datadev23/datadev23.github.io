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
}



// redraw the ball after 10 seconds 
// you then the draw function as this calls the ball. 
setInterval(draw,10);