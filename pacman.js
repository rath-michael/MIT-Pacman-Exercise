const pacArray = [
  ['PacMan1.png', 'PacMan2.png'],
  ['PacMan3.png', 'PacMan4.png'],
];
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'PacMan1.png';
  newimg.width = 100;
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';
  game.appendChild(newimg);
  // new style of creating an object
  return {
    position,
    velocity,
    newimg,
  };
}
let i = 0;
function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
    setCorrectImage(item);
    i++;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function setCorrectImage(item){
  if (item.velocity.x > 0) {
    if (i % 3 == 0){
      item.newimg.src = 'PacMan1.png';
    }
    else {
      item.newimg.src = 'PacMan2.png';
    }
  }
  else {
    if (i % 3 == 0){
      item.newimg.src = 'PacMan3.png';
    }
    else {
      item.newimg.src = 'PacMan4.png';
    }
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}