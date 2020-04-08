// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

window.addEventListener('resize', () => {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;
});

// --------------------------------------------------------------------

const { Engine } = Matter;
const { World } = Matter;
const { Bodies } = Matter;
const { Vertices } = Matter;

const engine = Engine.create();
const { world } = engine;

// Events
canvas.addEventListener('click', (evt) => {
  const x = evt.clientX - offSetLeft;
  const y = evt.clientY - offSetTop;
  game.addBall(x, y);
});

/* ---------- Ball ----------*/

class Ball {
  constructor(x, y) {
    this.r = 8;
    this.options = {
      restitution: 0.5,
      friction: 0,
      density: 1,
    };
    this.color = '#E63946';
    this.body = Matter.Bodies.circle(x, y, this.r, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const pos = this.body.position;
    ctx.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

/* ---------- Walls ----------*/

class circleWall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.options = {
      restitution: 1,
      friction: 0,
      isStatic: true,
    };
    this.color = '#1D3557';
    this.body = Bodies.circle(this.x, this.y, this.r, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class ShapeWall {
  constructor(x, y, vertices) {
    this.x = x;
    this.y = y;
    this.options = {
      restitution: 1,
      friction: 0,
      isStatic: true,
    };
    this.vertices = vertices;
    this.color = '#1D3557';
    this.body = Bodies.fromVertices(this.x, this.y, this.vertices, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const firstVertex = this.vertices[0];
    ctx.moveTo(firstVertex.x + this.x, firstVertex.y + this.y);
    for (const vertex of this.vertices) {
      ctx.lineTo(vertex.x + this.x, vertex.y + this.y);
    }
    ctx.closePath();
    ctx.fill();
  }
}

class SquareWall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.options = {
      restitution: 1,
      friction: 0,
      isStatic: true,
    };
    this.width = width;
    this.height = height;
    this.color = '#1D3557';
    this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
  }
}

/* ---------- Checker ----------*/

class Checker {
  constructor(x, y, width, height, left = true, right = true) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#1D3557';
    this.walls = [];
    if (left) {
      this.walls.push(new SquareWall(this.x - this.width / 2, this.y, 4, height));
    }
    if (right) {
      this.walls.push(new SquareWall(this.x + this.width / 2, this.y, 4, height));
    }
  }

  draw() {
    for (const wall of this.walls) {
      wall.draw();
    }
  }
}

/* ---------- Game ----------*/

class Plinko {
  constructor() {
    this.balls = [];
    this.generateWalls();
  }

  generateWalls() {
    this.walls = [];
    const rows = 5;
    const cols = 8;
    const offsetX = width / (rows + 1);
    const offsetY = height * 0.8 / (cols + 1);
    const offsetYAbs = offsetY + height * 0.1;

    const vertices = [{ x: 0, y: -offsetY }, { x: offsetX * 0.5, y: 0 }, { x: 0, y: offsetY }, { x: -offsetX * 0.5, y: 0 }];
    for (let i = 0; i < cols; i++) {
      const counter = rows - (i % 2);
      const offsetRow = offsetX + offsetX * (i % 2) * 0.5;

      if (i % 2) {
        const y = offsetYAbs + offsetY * i;
        this.walls.push(new ShapeWall(0, y, vertices));
        this.walls.push(new ShapeWall(width, y, vertices));
        if (cols - i <= 2) {
          this.walls.push(new SquareWall(0, height - (height - y) * 0.5, offsetX, height - y));
          this.walls.push(new SquareWall(width, height - (height - y) * 0.5, offsetX, height - y));
        }
      }

      for (let j = 0; j < counter; j++) {
        const x = offsetRow + offsetX * j;
        const y = offsetYAbs + offsetY * i;
        this.walls.push(new circleWall(x, y));
      }
    }

    // Borders
    const wallLeft = new SquareWall(0, height * 0.5, 8, height);
    const wallRight = new SquareWall(width, height * 0.5, 8, height);
    const wallTop = new SquareWall(width * 0.5, 0, width, 8);
    const wallBottom = new SquareWall(width * 0.5, height, width, 8);
    this.walls.push(wallLeft);
    this.walls.push(wallRight);
    this.walls.push(wallTop);
    this.walls.push(wallBottom);

    // Checkers
    for (let i = 1; i <= rows; i++) {
      const left = i != 1;
      const right = i != rows;
      this.walls.push(new Checker(offsetX * i, height * 0.95, offsetX, height * 0.1, left, right));
    }
  }

  addBall(x, y) {
    if (y < height * 0.15) {
      const ball = new Ball(x, y);
      this.balls.push(ball);
    }
  }

  step() {
    Engine.update(engine);
    this.draw();
  }

  draw() {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#A8DADC';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    for (const wall of this.walls) {
      wall.draw();
    }
    for (const ball of this.balls) {
      ball.draw();
    }
  }
}

const game = new Plinko();

function loop() {
  requestAnimationFrame(loop);
  game.step();
}

loop();
