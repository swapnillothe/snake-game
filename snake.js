const BOUNDARY = 625;
const TWENTYFIVE = 25;

/* supportive functions */
const addTwentyFive = num => num + TWENTYFIVE;
const subtractTwentyFive = num => num - TWENTYFIVE;
const getRandomCoOrdinate = () => (Math.ceil(Math.random() * 11)) * TWENTYFIVE;
const getPosition = element => element['position'];
const getAction = element => element['action'];
const getCoOrdinateToChange = element => element['coOrdinateToChange'];
const moveSnake = function () { moveSnakeBody(); moveSnakeHead() }
const moveRight = () => { coOrdinateToChange = 'y'; action = addTwentyFive }
const moveDown = () => { coOrdinateToChange = 'x'; action = addTwentyFive }
const moveUp = () => { coOrdinateToChange = 'x'; action = subtractTwentyFive }
const moveLeft = () => { coOrdinateToChange = 'y'; action = subtractTwentyFive }
const getCurrentTailDetail = () => snake[snake.length - 1];

/*Global variables */

const position = { x: 0, y: 0 };
let coOrdinateToChange = 'x';
let action = addTwentyFive;
const snakeHead = { action, coOrdinateToChange, position };
const snake = [snakeHead];

const getPositionTag = function (position) {
  return `position:relative;top:${position['x']}px;left:${position['y']}px`
}

const moveSnakeFood = function (foodPosition) {
  const food = document.getElementById('food');
  foodPosition['x'] = getRandomCoOrdinate();
  foodPosition['y'] = getRandomCoOrdinate();
  food.setAttribute('style', `${getPositionTag(foodPosition)};`);
}

const createPart = function (action, coOrdinateToChange, position) {
  return { action, coOrdinateToChange, position };
}


const getTailDetail = function () {
  const tail = getCurrentTailDetail();
  const action = getAction(tail);
  const coOrdinateToChange = getCoOrdinateToChange(tail);
  const position = {};
  return createPart(action, coOrdinateToChange, position);
}

const addTailBody = function () {
  snake.push(getTailDetail());
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

const setSnakePartAttribute = function (id) {
  const snakePart = snake[id];
  const position = getPosition(snakePart);
  const coOrdinateToChange = getCoOrdinateToChange(snakePart);
  const bodyPart = document.getElementById(id);
  const action = getAction(snakePart);
  
  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const circulateSnakePartData = function (data1, data2) {
  const position1 = getPosition(data1)
  const position2 = getPosition(data2);
  data1['action'] = getAction(data2);
  data1['coOrdinateToChange'] = getCoOrdinateToChange(data2);
  position1['x'] = position2['x'] - 50;
  position1['y'] = position2['y'];
}

const moveSnakeBody = function () {
  for (let index = snake.length - 1; index > 0; index--) {
    circulateSnakePartData(snake[index], snake[index - 1]);
    setSnakePartAttribute(index);
  }
}

const moveSnakeHead = function () {
  let head = document.getElementById(0);
  position[coOrdinateToChange] = action(position[coOrdinateToChange]);
  head.setAttribute('style', `${getPositionTag(position)};`);
}

const moves = {
  ArrowRight: moveRight,
  ArrowDown: moveDown,
  ArrowUp: moveUp,
  ArrowLeft: moveLeft
}

const updateMove = event => moves[event.key]();
const isSamePoint = (p1, p2) => p1['x'] == p2['x'] && p1['y'] == p2['y'];

const hasEatenFood = function (foodPosition) {
  const snakeHead = snake[0];
  const headPosition = getPosition(snakeHead);
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
  const headPosition = getPosition(snake[0]);
  return hasNegativeCoOrdinate(headPosition) || isOutOfGround(headPosition);
}

const hasTouchedWall = () => isOutOfBoundary();

const ENDGAMEMSG = 'You killed SNAKE by touching wall compound';

const showEndMsg = () => {
  board.innerText = board.innerText + ENDGAMEMSG;
}

const startGame = () => {
  const foodPosition = {};
  moveSnakeFood(foodPosition);
  const runSnake = setInterval(() => {
    if (hasEatenFood(foodPosition)) { addTail(); moveSnakeFood(foodPosition); };
    if (hasTouchedWall()) { showEndMsg(); clearInterval(runSnake) };
    moveSnake();
  }, 100);
}