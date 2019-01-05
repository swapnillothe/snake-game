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

const getRandomCoOrdinate = function () {
  let random = (Math.ceil(Math.random() * 11)) * 25;
  return random;
}

const position = { x: 100, y: 100 };
const obstaclePosition = {};
let coOrdinateToChange = 'x';
let action = addTen;
const snake = [{ action, coOrdinateToChange, position }];
let length = 1;

const getPositionTag = function (position) {
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeObstacle = function () {
  let obstacle = document.getElementById('obstacle');
  obstaclePosition['x'] = getRandomCoOrdinate();
  obstaclePosition['y'] = getRandomCoOrdinate();
  obstacle.setAttribute('style', `${getPositionTag(obstaclePosition)};`);
}

const createPart = function (action, coOrdinateToChange, position) {
  return { action, coOrdinateToChange, position };
}

const getTail = function () {
  let tail = snake[snake.length - 1];
  let action = tail['action'];
  let coOrdinateToChange = tail['coOrdinateToChange'];
  let position = {};
  return createPart(action, coOrdinateToChange, position);
}

const addTailBody = function () {
  const newTail = getTail();
  snake.push(newTail);
}

const addTailBodyTag = function () {
  const id = length++;
  return `<div id=${id} class='snakeBody'></div>`
}

const addTail = function () {
  const snake = document.getElementById('snake');
  snake.innerHTML += `${addTailBodyTag()}`;
  addTailBody();
}

const setAttribute = function (id) {
  let part = snake[id];
  let position = part['position'];
  let coOrdinateToChange = part['coOrdinateToChange'];
  let bodyPart = document.getElementById(id);
  let action = getCorrectedAction(part);
  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const getCorrectedAction = function (part) {
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
    tailPart['coOrdinateToChange'] = preTailPart['coOrdinateToChange'];
    tailPart['position']['x'] = preTailPart['position']['x'] + 25;
    tailPart['position']['y'] = preTailPart['position']['y'];
    setAttribute(index);
  }
}

const moveSnakeHead = function () {
  let head = document.getElementById(0);
  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnake = function () {
  moveSnakeBody();
  moveSnakeHead();
}

const moveRight = () => {
  coOrdinateToChange = 'y';
  action = addTen;
}

const moveDown = () => {
  coOrdinateToChange = 'x';
  action = addTen;
}

const moveUp = () => {
  coOrdinateToChange = 'x';
  action = subtractTen;
}

const moveLeft = () => {
  coOrdinateToChange = 'y';
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
  return isSamePoint(headPosition, obstaclePosition);
}

let startGame = () => {
  moveSnakeObstacle();
  setInterval(() => {
    if (getFood()) {
      addTail();
      moveSnakeObstacle();
    }
    moveSnake();
  }, 300);
}