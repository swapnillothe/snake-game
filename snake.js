const BOUNDARY = 625;
const TWENTYFIVE = 25;
const addTwentyFive = num => num + TWENTYFIVE;
const subtractTwentyFive = num => num - TWENTYFIVE;
const getRandomCoOrdinate = () => (Math.ceil(Math.random() * 11)) * TWENTYFIVE;
const getPosition = element => element.position;
const moveSnake = function (snake) { moveSnakeBody(snake); moveSnakeHead(snake) }

const moveRight = (snakePart) => {
  snakePart.position.y = snakePart.position.y + 25;
}

const moveDown = (snakePart) => {
  snakePart.position.x = snakePart.position.x + 25;
}

const moveUp = (snakePart) => {
  snakePart.position.x = snakePart.position.x - 25;
}

const moveLeft = (snakePart) => {
  snakePart.position.y = snakePart.position.y - 25;
}

const getPositionTag = function (position) {
  return `position:relative;top:${position.x}px;left:${position.y}px`
}

const moveSnakeFood = function (foodPosition) {
  const food = document.getElementById('food');
  foodPosition.x = getRandomCoOrdinate();
  foodPosition.y = getRandomCoOrdinate();
  food.setAttribute('style', `${getPositionTag(foodPosition)};`);
}

const createPart = function (position, direction) {
  return { position, direction };
}


const getTailDetail = function (snake) {
  const tail = snake[snake.length - 1];
  const position = {};
  const direction = {};
  direction.move = tail.direction.move;
  return createPart(position, direction);
}

const addTailBody = function (snake) {
  snake.push(getTailDetail(snake));
}

const addTailBodyTag = function (snake) {
  const id = snake.length;
  return `<div id=${id} class='snakeBody'></div>`
}

const addTail = function (snake) {
  const snakeTag = document.getElementById('snake');
  snakeTag.innerHTML = snakeTag.innerHTML + `${addTailBodyTag(snake)}`;
  addTailBody(snake);
}

const setSnakePartAttribute = function (id, snake) {
  const position = getPosition(snake[id]);
  const bodyPart = document.getElementById(id);
  bodyPart.setAttribute('style', `${getPositionTag(position)};`);
}

const circulateSnakePartData = function (data1, data2) {
  const position1 = getPosition(data1);
  const position2 = getPosition(data2);
  position1.x = position2.x - 25;
  position1.y = position2.y;
  data1.direction.move = data2.direction.move;
}

const moveSnakeBody = function (snake) {
  for (let index = snake.length - 1; index > 0; index--) {
    circulateSnakePartData(snake[index], snake[index - 1]);
    setSnakePartAttribute(index, snake);
  }
}

const moveSnakeHead = function (snake) {
  let snakeHead = document.getElementById(0);
  const position = snake[0].position;
  snake[0].direction.move(snake[0]);
  snakeHead.setAttribute('style', `${getPositionTag(position)};`);
}

const direction = { move: moveDown };

const updateMove = (event) => {
  const moves = {
    ArrowRight: () => {
      direction.move = moveRight;
    },
    ArrowDown: () => {
      direction.move = moveDown;
    },
    ArrowUp: () => {
      direction.move = moveUp;
    },
    ArrowLeft: () => {
      direction.move = moveLeft;
    }
  }
  moves[event.key]();
}

const isSamePoint = (p1, p2) => p1.x == p2.x && p1.y == p2.y;

const hasEatenFood = function (foodPosition, snake) {
  const snakeHead = snake[0];
  const headPosition = getPosition(snakeHead);
  return isSamePoint(headPosition, foodPosition);
}

const hasNegativeCoOrdinate = element => (element.x < 0 || element.y < 0);
const isOutOfGround = element => (element.x > BOUNDARY || element.y > BOUNDARY);

const isOutOfBoundary = function (snake) {
  const headPosition = getPosition(snake[0]);
  return hasNegativeCoOrdinate(headPosition) || isOutOfGround(headPosition);
}

const hasTouchedWall = (snake) => isOutOfBoundary(snake);

const ENDGAMEMSG = 'You killed SNAKE by touching wall compound';

const showEndMsg = () => {
  board.innerText = board.innerText + ENDGAMEMSG;
}

const startGame = () => {
  const foodPosition = {};
  const position = { x: 0, y: 0 };
  const snake = [{ position, direction }];
  moveSnakeFood(foodPosition);
  const runSnake = setInterval(() => {
    if (hasEatenFood(foodPosition, snake)) {
      addTail(snake); moveSnakeFood(foodPosition);
    };
    if (hasTouchedWall(snake)) {
      showEndMsg(); clearInterval(runSnake)
    };
    moveSnake(snake);
  }, 300);
}