const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_container = document.getElementById("canvas_container");

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

// --------------------------------------------------------------------

const KEY_E = 13;
const KEY_L = 37;
const KEY_U = 38;
const KEY_R = 39;
const KEY_D = 40;

const imageFood = new Image();
const imageSnake = new Image();
const imageGround = new Image();
const imageWall = new Image();

imageFood.src = "assets/food.png";
imageSnake.src = "assets/snake.png";
imageGround.src = "assets/ground.png";
imageWall.src = "assets/wall.png";

let lastPress;

let tileWidth = 32;
let tileHeight = 16;

document.addEventListener('keydown', (evt) => {
  switch (evt.which) {
    case KEY_U:
      lastPress = lastPress == KEY_D ? KEY_D : evt.which;
      break;
    case KEY_R:
      lastPress = lastPress == KEY_L ? KEY_L : evt.which;
      break;
    case KEY_D:
      lastPress = lastPress == KEY_U ? KEY_U : evt.which;
      break;
    case KEY_L:
      lastPress = lastPress == KEY_R ? KEY_R : evt.which;
      break;
  }
});

function drawIsometric(image, x, y, offY = 0) {
  ctx.drawImage(image, (x - y) * tileWidth / 2 + width * 0.5, (x + y + 1.85 * offY) * tileHeight / 2 + height * 0.1);
}

function compare(a, b) {
  if (a.x > b.x) return 1;
  else if (a.x < b.x) return -1;
  else {
    if (a.y > b.y) return 1;
    else if (a.y < b.y) return -1;
    return 0;
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = imageFood;
  }
}

class BodySection {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = imageSnake;
  }
}

class Wall {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.image = imageWall;
  }
}

class Snake {
  constructor(x,y) {
    this.tail = [];
    this.head = new BodySection(x, y)
  }

  step(dx, dy) {
    this.tail.unshift(this.head);
    this.tail.pop();
    let x = this.head.x;
    let y = this.head.y;
    this.head = new BodySection(x + dx, y + dy)
  }

  checkCollision(obj) {
    if (obj.x == this.head.x && obj.y == this.head.y) {
      return true;
    }
    return false;
  }

  checkTailCollision() {
    for (let section of this.tail) {
      if (this.checkCollision(section)) {
        return true;
      }
    }
    return false;
  }

  eat() {
    this.tail.unshift(this.head);
  }
}

class Game {
  constructor() {
    this.snake = new Snake(5, 5);
    this.food = new Food(10, 10);

    this.createWorld(30, 30);

  }

  createWorld(x, y) {
    this.world = {
      x: x,
      y: y
    };

    this.walls = [];

    for (let i = -1; i < x + 1; i++) {
      for (let j = -1; j < y + 1; j++) {
        if (i == -1 || i == x || j == -1 || j == y) {
          let wall = new Wall(i,j);
          this.walls.push(wall);
        }
      }
    }
  }

  restart(){
    this.snake = new Snake(5, 5);
    lastPress = null;
  }

  step() {
    let dx = 0;
    let dy = 0;
    switch (lastPress) {
      case KEY_U:
        dy--;
        break;
      case KEY_R:
        dx++;
        break;
      case KEY_D:
        dy++;
        break;
      case KEY_L:
        dx--;
        break;
    }

    if (this.snake.checkCollision(this.food)) {
      this.snake.eat();
    }

    this.snake.step(dx, dy);

    let head = this.snake.head;
    if (this.snake.checkTailCollision()) {
      this.restart();
    }
    else if (head.x == -1 || head.x == this.world.x) {
      this.restart();
    }
    else if (head.y == -1 || head.y == this.world.y) {
      this.restart();
    }

  }

  graph() {
    let map = this.walls.concat(this.snake.tail);
    map.push(this.food);
    map.push(this.snake.head);
    map.sort(compare);

    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, width, height);
    for (let i = -1; i <= this.world.x; i++) {
      for (let j = -1; j <= this.world.y; j++) {
        drawIsometric(imageGround, j, i, 1);
      }
    }
    for (let obj of map) {
      drawIsometric(obj.image, obj.x, obj.y);
    }
  }
}

game = new Game();

function loop() {
  setTimeout(() => {
    requestAnimationFrame(loop);
    game.step();
    game.graph();
  }, 1000 / 10);
}

loop();
