const incrementByTen = function (num) {
  return (num += 10) % 500;
}

const decrementByTen = function (num) {
  return Math.abs((num -= 10) % 500);
}

let position = { x: 100, y: 100 }
let movement = 'x';
let action = incrementByTen;

const getPosition = function (position) {
  console.log(position);
  return `position:fixed;top:${position['x']}px;left:${position['y']}px`
}

const formatSnake = function () {
  return `height:25px;width:25px`
}

const moveSnake = function () {
  let block = document.getElementById('mainDiv');
  position[movement] = action(position[movement]);
  block.setAttribute('style', `${getPosition(position)};`);
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
}, 200);