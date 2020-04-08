// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', () => {
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

imageFood.src = 'assets/food.png';
imageSnake.src = 'assets/snake.png';
imageGround.src = 'assets/ground.png';
imageWall.src = 'assets/wall.png';

let lastPress;
let waitNextFrame = false;

const tileWidth = 32;
const tileHeight = 16;

document.addEventListener('keydown', (evt) => {
  if (!waitNextFrame) {
    switch (evt.which) {
      case KEY_U:
        if (lastPress != KEY_D) {
          lastPress = evt.which;
          waitNextFrame = true;
        }
        break;
      case KEY_R:
        if (lastPress != KEY_L) {
          lastPress = evt.which;
          waitNextFrame = true;
        }
        break;
      case KEY_D:
        if (lastPress != KEY_U) {
          lastPress = evt.which;
          waitNextFrame = true;
        }
        break;
      case KEY_L:
        if (lastPress != KEY_R) {
          lastPress = evt.which;
          waitNextFrame = true;
        }
        break;
    }
  }
});

function drawIsometric(image, x, y, offY = 0) {
  ctx.drawImage(image, (x - y) * tileWidth / 2 + width * 0.5, (x + y + 1.85 * offY) * tileHeight / 2 + height * 0.1);
}

function compare(a, b) {
  if (a.x > b.x) return 1;
  if (a.x < b.x) return -1;

  if (a.y > b.y) return 1;
  if (a.y < b.y) return -1;
  return 0;
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

  checkCollision(obj) {
    if (obj.x == this.x && obj.y == this.y) {
      return true;
    }
    return false;
  }
}

class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = imageWall;
  }
}

class Snake {
  constructor(x, y) {
    this.tail = [];
    this.head = new BodySection(x, y);
  }

  step(dx, dy) {
    this.tail.unshift(this.head);
    this.tail.pop();
    const { x } = this.head;
    const { y } = this.head;
    this.head = new BodySection(x + dx, y + dy);
  }

  checkCollision(obj) {
    if (this.head.checkCollision(obj)) {
      return true;
    }
    return false;
  }

  checkTailCollision() {
    for (const section of this.tail) {
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

    this.createWorld(25, 25);
  }

  createWorld(x, y) {
    this.world = {
      x,
      y,
    };

    this.walls = [];

    for (let i = -1; i < x + 1; i++) {
      for (let j = -1; j < y + 1; j++) {
        if (i == -1 || i == x || j == -1 || j == y) {
          const wall = new Wall(i, j);
          this.walls.push(wall);
        }
      }
    }
  }

  setFood() {
    let ok = true;
    const x = Math.floor(Math.random() * this.world.x);
    const y = Math.floor(Math.random() * this.world.x);
    this.food = new Food(x, y);
    for (const section of this.snake.tail) {
      if (section.checkCollision(this.food)) {
        ok = false;
      }
    }
    if (this.snake.head.checkCollision(this.food)) {
      ok = false;
    }
    if (!ok) {
      this.setFood();
    }
  }

  restart() {
    this.snake = new Snake(5, 5);
    this.setFood();
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
      this.setFood();
    }

    this.snake.step(dx, dy);

    const { head } = this.snake;
    if (this.snake.checkTailCollision()) {
      this.restart();
    } else if (head.x == -1 || head.x == this.world.x) {
      this.restart();
    } else if (head.y == -1 || head.y == this.world.y) {
      this.restart();
    }
  }

  graph() {
    const map = this.walls.concat(this.snake.tail);
    map.push(this.food);
    map.push(this.snake.head);
    map.sort(compare);

    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, width, height);
    for (let i = -1; i <= this.world.x; i++) {
      for (let j = -1; j <= this.world.y; j++) {
        drawIsometric(imageGround, i, j, 1);
      }
    }
    for (const obj of map) {
      drawIsometric(obj.image, obj.x, obj.y);
    }
  }
}

game = new Game();

function loop() {
  setTimeout(() => {
    requestAnimationFrame(loop);
    waitNextFrame = false;
    game.step();
    game.graph();
  }, 1000 / 15);
}

loop();
