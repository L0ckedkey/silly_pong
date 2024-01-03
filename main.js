import { Ball, Paddle } from "./model.js";

const canvas = document.getElementById('canvas');
var input = document.getElementById('input');
const c = canvas.getContext('2d');

canvas.width = 400
canvas.height = 600


var paddle = new Paddle({
    position: {
        x: 180,
        y: 550
    },
    velocity: {
        x: 3,
        y: 3,
    },
    width: 40,
    heigth: 10,
    color: 'blue',
    c: c
})


var ball = new Ball({
    position: {
        x: 200,
        y: 300,
    },
    velocity: {
        x: 5,
        y: 5,
    },
    radius: 3,
    color: 'black',
    c: c
})

let keys = []

window.addEventListener('keydown', function(e){
    keys[e.key] = true;
})

window.addEventListener('keyup', function(e){
    keys[e.key] = false;
})


function checkEvent(){
    if(keys['d']){
        paddle.update('right')
    }else if(keys['a']){
        paddle.update('left')
    }
}

function paddleAndBallCollision(){
    if(ball.position.x >= paddle.position.x && ball.position.x <= paddle.position.x + paddle.width &&
        ball.position.y >= paddle.position.y && ball.position.y <= paddle.position.y + paddle.heigth){
        ball.velocity.y *= -1
    }
}

function drawAlphabetRectangles() {
    var rectWidth = 15.3;
    var rectHeight = 15;
    var startX = 0;
    var startY = 0;

    for (var i = 0; i < 26; i++) {
      c.fillStyle = 'lightblue';
      c.fillRect(startX + i * rectWidth, startY, rectWidth, rectHeight);

      // Draw the character inside the rectangle
      c.fillStyle = 'black';
      c.font = '10px Arial';
      c.fillText(String.fromCharCode('A'.charCodeAt(0) + i), startX + i * rectWidth + 4, startY + 12);
    }
}

function addCharacter(character) {
    input.value += character;
}

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    checkEvent()
    drawAlphabetRectangles();
    paddleAndBallCollision()
    paddle.render()
    ball.render()
    if(ball.isCheckAlphabet){
        addCharacter(ball.checkAlphabet())
    }
    requestAnimationFrame(animate)
}

animate()