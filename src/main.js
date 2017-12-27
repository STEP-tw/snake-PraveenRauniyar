let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;
let animator=undefined;

const stopGame = function (head) {
  let xPosition = head.x;
  let yPosition = head.y;
  let direction = head.direction;
  checkPositions(xPosition,yPosition,direction);
}

const isXAxisEastEdgePosition = function (xPosition,direction) {
  return xPosition == 119 && direction == "east"
};

const isYAxisSouthEdgePosition = function (yPosition,direction) {
  return yPosition == 60 && direction == "south"
};

const isXAxisWestEdgePosition = function (xPosition,direction) {
  return xPosition == 0 && direction == "west"
};

const isYAxisNorthEdgePosition = function (yPosition,direction) {
  return yPosition == 0 && direction == "north"
}

const isYAxisEdgePosition = function (yPosition,direction) {
  return isYAxisNorthEdgePosition(yPosition,direction) || isYAxisSouthEdgePosition(yPosition,direction)
};

const isXAxisEdgePosition = function (xPosition,direction) {
  return isXAxisEastEdgePosition(xPosition,direction) || isXAxisWestEdgePosition(xPosition,direction)
}

const isAnyEdgePosition = function(xPosition,yPosition,direction){
  return isXAxisEdgePosition(xPosition,direction) || isYAxisEdgePosition (yPosition,direction);
}

const checkPositions = function(xPosition,yPosition,direction){
  if(isAnyEdgePosition(xPosition,yPosition,direction)){
    clearInterval(animator);
    document.getElementById("stopGame").innerText ="Game Over"
  }
};
//
const playAgain = function () {
  document.getElementById("stopGame").innerText ="";
  location.reload();
};

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  stopGame(head);
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
