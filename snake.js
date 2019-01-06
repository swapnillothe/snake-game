const BOUNDARY = 675;
const TWENTYFIVE = 25;

const addTwentyFive = function (num) {
  return num = (num + TWENTYFIVE)%BOUNDARY;
}

const subtractTwentyFive = function (num) {
  if (num == 0) {
    return num = 650;
  }
  return num = num - TWENTYFIVE;
}

const increaseByTwentyFive = function (num) {
  return (num + TWENTYFIVE)%BOUNDARY;
}

const decreaseByTwentyFive = function (num) {
  if (num == 0) {
    return BOUNDARY;
  }
  return (num - TWENTYFIVE);
}

const getValidCoOrdinate = function (action, num) {
  let validCoOrdinate = action(num) % BOUNDARY;
  return validCoOrdinate;
}

const getRandomCoOrdinate = function () {
  let random = (Math.ceil(Math.random() * 11)) * TWENTYFIVE;
  return random;
}

const position = { x: 0, y: 0 };
const foodPosition = {};
let coOrdinateToChange = 'x';
let action = addTwentyFive;
const snakeHead = { action, coOrdinateToChange, position };
const snake = [snakeHead];

const getPositionTag = function (position) {
  return `position:relative;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeFood = function () {
  let food = document.getElementById('food');
  foodPosition['x'] = getRandomCoOrdinate();
  foodPosition['y'] = getRandomCoOrdinate();
  food.setAttribute('style', `${getPositionTag(foodPosition)};`);
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
  const id = snake.length;
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

  position[coOrdinateToChange] = getValidCoOrdinate(action, position[coOrdinateToChange]);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const getCorrectedAction = function (part) {
  if (part['action'] == addTwentyFive) {
    return increaseByTwentyFive;
  }
  return decreaseByTwentyFive;
}

const moveSnakeBody = function () {
  for (let index = snake.length - 1; index > 0; index--) {
    let tailPart = snake[index];
    let preTailPart = snake[index - 1];
    tailPart['action'] = preTailPart['action'];
    tailPart['coOrdinateToChange'] = preTailPart['coOrdinateToChange'];
    tailPart['position']['x'] = preTailPart['position']['x'] - 50;
    tailPart['position']['y'] = preTailPart['position']['y'];
    setAttribute(index);
  }
}

const moveSnakeHead = function () {
  let head = document.getElementById(0);
  position[coOrdinateToChange] = getValidCoOrdinate(action, position[coOrdinateToChange]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnake = function () {
  moveSnakeBody();
  moveSnakeHead();
}

const moveRight = () => {
  coOrdinateToChange = 'y';
  action = addTwentyFive;
}

const moveDown = () => {
  coOrdinateToChange = 'x';
  action = addTwentyFive;
}

const moveUp = () => {
  coOrdinateToChange = 'x';
  action = subtractTwentyFive;
}

const moveLeft = () => {
  coOrdinateToChange = 'y';
  action = subtractTwentyFive;
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
  return isSamePoint(headPosition, foodPosition);
}

const end = function () {
  let headPosition = snake[0]['position'];
  let snakeBody = snake.slice(1).map(x => x['position']);
  return snakeBody.some(isSamePoint.bind(null, headPosition));
}

const startGame = () => {
  moveSnakeFood();
  const runSnake = setInterval(() => {
    if (getFood()) { addTail(); moveSnakeFood(); };
    //if (end()) { clearInterval(runSnake) };
    moveSnake();
  }, 100);
}