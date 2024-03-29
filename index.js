let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// ctx.fillRect(0,0,50,50)

let boardHeight = 450;
let boardWidth = 1000;
let square = 50;

let snakeCells = [[0,0]];

let direction = 'right';

let gameOver = false;

let foodCell = generateRandomCell();

let score = 0;

document.addEventListener('keydown', function(event) {
  console.log(event,"rrr")
  if (event.key === 'ArrowLeft') {
    direction = 'left';
  } else if (event.key === 'ArrowDown') {
    direction = 'down';
  } else if (event.key === 'ArrowRight') {
    direction = 'right';
  } else {
    direction = 'up';
  }
})

let intervalId = setInterval(function() {
  update();
  draw();
}, 180);
[1,2,3,4,5]
function update() {
  let headX = snakeCells[snakeCells.length - 1][0];
  let headY = snakeCells[snakeCells.length - 1][1];
   
  let newX
  let newY

  if (direction === 'right') {
    newX = headX + square;
    newY = headY;

    if (newX === boardWidth) {
      gameOver = true;
    }
    
  } else if (direction === 'left') {
    newX = headX - square;
    newY = headY;

    if (newX < 0) {
      gameOver = true;
    }

  } else if (direction === 'up') {
    newX = headX;
    newY = headY - square;

    if (newY < 0) {
      gameOver = true;
    }
 
  } else {
    newX = headX;
    newY = headY + square;

    if (newY === boardHeight) {
      gameOver = true;
    }
  }

  snakeCells.push([newX, newY]);
 
  if (foodCell[0] === headX && foodCell[1] === headY) {
    foodCell = generateRandomCell();
    score += 1;
  } else {
    snakeCells.shift();
  
  }
}

function draw() {

  if (gameOver === true) {
    clearInterval(intervalId);
    ctx.fillStyle = 'red';
    ctx.font = '40px sans-serif';
    ctx.fillText('Game over', 50, 150);
    return;
  }

  ctx.clearRect(0, 0, boardWidth, boardHeight);
  for (let cell of snakeCells) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(cell[0], cell[1], square, square);
    
  }

  ctx.fillStyle = 'yellow';
  ctx.fillRect(foodCell[0], foodCell[1], square, square);
   

  // draw score
  ctx.fillStyle = 'white';
  ctx.font = '20px sans-serif';
  ctx.fillText(`Score: ${score}`, 50, 50);
}
// draw()

function generateRandomCell() {
  return [
    Math.round((Math.random()*(boardWidth ))/square)*square,
    Math.round((Math.random()*(boardHeight))/square)*square
  ]
}
console.log(generateRandomCell())


