const addTen = function (num) {
  return (num += 10) % 500;
}

const subtractTen = function (num) {
  return ((num -= 10) || 500);
}

const increaseByTen = function (num) {
  return (num + 10) % 500;
}

const decreaseByTen = function (num) {
  return (num - 10) || 500;
}

let position = { x: 100, y: 100 };
let obsPosition = { x: 400, y: 300 };
let movement = 'x';
let action = addTen;
let length = 2;
let snake = [{ action, movement, position }];

const getPositionTag = function (position) {
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeObs = function () {
  let obstacle = document.getElementById('obstacle');
  obstacle.setAttribute('style', `${getPositionTag(obsPosition)};`);
}


const getLastPart = function () {
  let action = snake[snake.length - 1]['action'];
  let movement = snake[snake.length - 1]['movement'];
  let position = {};
  position['x'] = snake[snake.length - 1]['position']['x'];
  position['y'] = snake[snake.length - 1]['position']['y'];
  return { action, movement, position };
}

const addTail = function () {
  snake.push(getLastPart());
}

const addTailBodyTag = function () {
  let id = length++;
  return `<div id=${id} class='snakeBody'></div>`
}

const addTailBody = function () {
  let snake = document.getElementById('snake');
  snake.innerHTML += `${addTailBodyTag()}`;
  addTail();
}

const moveSnakeBody = function () {
  for (let index = snake.length - 1; index > 1; index--) {
    snake[index]['action'] = snake[index - 1]['action'];
    if (snake[index - 1]['action'] == addTen) {
      snake[index]['action'] = increaseByTen;
    }
    if (snake[index - 1]['action'] == subtractTen) {
      snake[index]['action'] = decreaseByTen;
    }
    snake[index]['movement'] = snake[index - 1]['movement'];
    snake[index]['position']['x'] = snake[index - 1]['position']['x'];
    snake[index]['position']['y'] = snake[index - 1]['position']['y'];
    let head = document.getElementById(index);
    position[movement] = action(position[movement]);
    head.setAttribute('style', `${getPositionTag(position)};`);
  }
}

const moveSnakeHead = function () {
  let head = document.getElementById(1);
  position[movement] = action(position[movement]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnake = function () {
  moveSnakeHead();
  moveSnakeBody();
  moveSnakeObs();
}

const moveRight = () => {
  movement = 'y';
  action = addTen;
}

const moveDown = () => {
  movement = 'x';
  action = addTen;
}

const moveUp = () => {
  movement = 'x';
  action = subtractTen;
}

const moveLeft = () => {
  movement = 'y';
  action = subtractTen;
}

const moves = {
  ArrowRight: moveRight,
  ArrowDown: moveDown,
  ArrowUp: moveUp,
  ArrowLeft: moveLeft
}

const updateMovement = function (event) {
  let key = event.key;
  moves[key]();
}

setInterval(() => {
  moveSnake();
  if (snake[0]['position']['x'] == obsPosition['x']) {
    addTailBody();
  }
}, 300);