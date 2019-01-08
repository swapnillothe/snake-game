const BOUNDARY = 625;
const TWENTYFIVE = 25;

const addTwentyFive = function (num) {
  return num = num + TWENTYFIVE;
}

const subtractTwentyFive = function (num) {
  return num = num - TWENTYFIVE;
}

const increaseByTwentyFive = num => num + TWENTYFIVE;
const decreaseByTwentyFive = num => num - TWENTYFIVE;
const getRandomCoOrdinate = () => (Math.ceil(Math.random() * 11)) * TWENTYFIVE;
const getPosition = element => element['position'];
const getAction = element => element['action'];
const getCoOrdinateToChange = element => element['coOrdinateToChange'];

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
  let action = getAction(tail);
  let coOrdinateToChange = getCoOrdinateToChange(tail);
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
  snake.innerHTML = snake.innerHTML + `${addTailBodyTag()}`;
  addTailBody();
}

const setAttribute = function (id) {
  let snakePart = snake[id];
  let position = getPosition(snakePart);
  let coOrdinateToChange = getCoOrdinateToChange(snakePart);
  let bodyPart = document.getElementById(id);
  let action = getCorrectedAction(snakePart);

  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const isActionAddTwentyFive = (action) => action == addTwentyFive;

const getCorrectedAction = function (part) {
  if (isActionAddTwentyFive(getAction(part))) {
    return increaseByTwentyFive;
  }
  return decreaseByTwentyFive;
}

const transferData = function (list1, list2) {
  const position1 = getPosition(list1)
  const position2 = getPosition(list2);
  list1['action'] = getAction(list2);
  list1['coOrdinateToChange'] = getCoOrdinateToChange(list2);
  position1['x'] = position2['x'] - 50;
  position1['y'] = position2['y'];
}

const moveSnakeBody = function () {
  for (let index = snake.length - 1; index > 0; index--) {
    transferData(snake[index], snake[index - 1]);
    setAttribute(index);
  }
}

const moveSnakeHead = function () {
  let head = document.getElementById(0);
  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moveSnake = function () { moveSnakeBody(); moveSnakeHead() }
const moveRight = () => { coOrdinateToChange = 'y'; action = addTwentyFive }
const moveDown = () => { coOrdinateToChange = 'x'; action = addTwentyFive }
const moveUp = () => { coOrdinateToChange = 'x'; action = subtractTwentyFive }
const moveLeft = () => { coOrdinateToChange = 'y'; action = subtractTwentyFive }

const moves = {
  ArrowRight: moveRight,
  ArrowDown: moveDown,
  ArrowUp: moveUp,
  ArrowLeft: moveLeft
}

const updateMove = event => moves[event.key]();
const isSamePoint = (p1, p2) => p1['x'] == p2['x'] && p1['y'] == p2['y'];

const getFood = function () {
  let headPosition = getPosition(snake[0]);
  return isSamePoint(headPosition, foodPosition);
}

const hasTouchBody = () => {
  let headPosition = getPosition(snake[0]);
  let snakeBody = snake.slice(1).map(getPosition);
  return snakeBody.some(isSamePoint.bind(null, headPosition));
}

const hasNegativeCoOrdinate = element => (element['x'] < 0 || element['y'] < 0);
const isOutOfGround = element => (element['x'] > BOUNDARY || element['y'] > BOUNDARY);

const isOutOfBoundary = function () {
  let headPosition = getPosition(snake[0]);
  return hasNegativeCoOrdinate(headPosition) || isOutOfGround(headPosition);
}

const end = () => isOutOfBoundary();

const ENDGAMEMSG = 'You killed SNAKE by touching wall compound';

const showEndMsg = () => {
  board.innerText = board.innerText + ENDGAMEMSG;
}

const startGame = () => {
  moveSnakeFood();
  const runSnake = setInterval(() => {
    if (getFood()) { addTail(); moveSnakeFood(); };
    if (end()) { showEndMsg(); clearInterval(runSnake) };
    moveSnake();
  }, 100);
}