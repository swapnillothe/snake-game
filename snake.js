const incrementByTen = function (num) {
  return (num += 10) % 500;
}

const decrementByTen = function (num) {
  return ((num -= 10) || 500);
}

let position = { x: 100, y: 100 }
let movement = 'x';
let action = incrementByTen;
let snake = [{ action, movement, position }];

const getPosition = function (position) {
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const formatSnake = function () {
  return `height:25px;width:25px`
}

const moveSnakeHead = function () {
  let head = document.getElementById(1);
  position[movement] = action(position[movement]);
  head.setAttribute('style', `${getPosition(position)};`);
}

const moveSnakeBody = function () {
  let body1 = document.getElementById(2);
  position[movement] = action(position[movement]);
  body1.setAttribute('style', `${getPosition(position)};`);

  let body2 = document.getElementById(3);
  position[movement] = action(position[movement]);
  body2.setAttribute('style', `${getPosition(position)};`);

  let body3 = document.getElementById(4);
  position[movement] = action(position[movement]);
  body3.setAttribute('style', `${getPosition(position)};`);

  let body4 = document.getElementById(5);
  position[movement] = action(position[movement]);
  body4.setAttribute('style', `${getPosition(position)};`);

  let body5 = document.getElementById(6);
  position[movement] = action(position[movement]);
  body5.setAttribute('style', `${getPosition(position)};`);

  let body6 = document.getElementById(7);
  position[movement] = action(position[movement]);
  body6.setAttribute('style', `${getPosition(position)};`);

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
}

const moveRight = () => {
  movement = 'y';
  action = incrementByTen;
}

const moveDown = () => {
  movement = 'x';
  action = incrementByTen;
}

const moveUp = () => {
  movement = 'x';
  action = decrementByTen;
}

const moveLeft = () => {
  movement = 'y';
  action = decrementByTen;
}

const moves = {
  ArrowRight: moveRight,
  ArrowDown: moveDown,
  ArrowUp: moveUp,
  ArrowLeft: moveLeft
}

const updateMovement = function (event) {
  let key = event.key;
  if (key) {
    moves[key]();
  }
}

setInterval(() => {
  moveSnake();
}, 500);