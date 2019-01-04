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
let snake = [{ action, movement, position }];

const getPositionTag = function (position) {
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeObs = function () {
  let obstacle = document.getElementById('obstacle');
  obstacle.setAttribute('style', `${getPositionTag(obsPosition)};`);
}

const moveSnakeHead = function () {
  let head = document.getElementById(1);
  position[movement] = action(position[movement]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnakeBody = function () {
  let body1 = document.getElementById(2);
  position[movement] = action(position[movement]);
  body1.setAttribute('style', `${getPositionTag(position)};`);

  let body2 = document.getElementById(3);
  position[movement] = action(position[movement]);
  body2.setAttribute('style', `${getPositionTag(position)};`);

  let body3 = document.getElementById(4);
  position[movement] = action(position[movement]);
  body3.setAttribute('style', `${getPositionTag(position)};`);

  let body4 = document.getElementById(5);
  position[movement] = action(position[movement]);
  body4.setAttribute('style', `${getPositionTag(position)};`);

  let body5 = document.getElementById(6);
  position[movement] = action(position[movement]);
  body5.setAttribute('style', `${getPositionTag(position)};`);

  let body6 = document.getElementById(7);
  position[movement] = action(position[movement]);
  body6.setAttribute('style', `${getPositionTag(position)};`);

  for (let index = snake.length - 1; index > 0; index--) {
    snake[index]['action'] = snake[index - 1]['action'];
    snake[index]['movement'] = snake[index - 1]['movement'];
    snake[index]['position']['x'] = snake[index - 1]['position']['x'];
    snake[index]['position']['y'] = snake[index - 1]['position']['y'];
  }
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
}, 400);