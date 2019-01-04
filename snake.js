const addTen = function (num) {
  return (num += 25) % 500;
}

const subtractTen = function (num) {
  return ((num -= 25) || 500);
}

const increaseByTen = function (num) {
  return (num + 25) % 500;
}

const decreaseByTen = function (num) {
  return (num - 25) || 500;
}

let position = { x: 100, y: 100 };
let obsPosition = { x: 400, y: 300 };
let movement = 'x';
let action = addTen;
let length = 1;
let snake = [{ action, movement, position }];

const getPositionTag = function (position) {
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeObs = function () {
  let obstacle = document.getElementById('obstacle');
  obstacle.setAttribute('style', `${getPositionTag(obsPosition)};`);
}

const createPart = function (action, movement, position) {
  return { action, movement, position };
}

const getTail = function () {
  let tail = snake[snake.length - 1];
  let action = tail['action'];
  let movement = tail['movement'];
  let position = {};
  position['x'] = tail['position']['x'];
  position['y'] = tail['position']['y'];
  return createPart(action, movement, position);
}

const addTailBody = function () {
  snake.push(getTail());
}

const addTailBodyTag = function () {
  let id = length++;
  return `<div id=${id} class='snakeBody'></div>`
}

const addTail = function () {
  let snake = document.getElementById('snake');
  snake.innerHTML += `${addTailBodyTag()}`;
  addTailBody();
}

const setAttribute = function (id) {
  let part = snake[id];
  let position = part['position'];
  let movement = part['movement'];
  let bodyPart = document.getElementById(id);
  let action = correctAction(part);
  position[movement] = action(position[movement]);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const correctAction = function (part) {
  if (part['action'] == addTail) {
    return increaseByTen;
  }
  return decreaseByTen;
}

const moveSnakeBody = function () {
  for (let index = snake.length - 1; index > 0; index--) {
    let tailPart = snake[index];
    let preTailPart = snake[index - 1];
    tailPart['action'] = preTailPart['action'];
    tailPart['movement'] = preTailPart['movement'];
    tailPart['position']['x'] = preTailPart['position']['x'];
    tailPart['position']['y'] = preTailPart['position']['y'];
    setAttribute(index);
  }
  moveSnakeHead();
}

const moveSnakeHead = function () {
  let head = document.getElementById(0);
  position[movement] = action(position[movement]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnake = function () {
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

const isSamePoint = function (p1, p2) {
  return p1['x'] == p2['x'] && p1['y'] == p2['y'];
}

const getFood = function () {
  let headPosition = snake[0]['position'];
  return isSamePoint(headPosition, obsPosition);
}

setInterval(() => {
  moveSnake();
  if (getFood()) {
    addTail();
  }
}, 300);