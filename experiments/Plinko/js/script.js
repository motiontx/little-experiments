// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById("canvas_container");

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

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Vertices = Matter.Vertices;

const engine = Engine.create();
const world = engine.world;

// Events
canvas.addEventListener("click", (evt) => {
  let x = evt.clientX - offSetLeft;
  let y = evt.clientY - offSetTop;
  game.addBall(x, y);
});

/*---------- Ball ----------*/

class Ball {
  constructor(x, y) {
    this.r = 8;
    this.options = {
      restitution: 0.5,
      friction: 0,
      density: 1
    }
    this.color = "#E63946";
    this.body = Matter.Bodies.circle(x, y, this.r, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let pos = this.body.position;
    ctx.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

/*---------- Walls ----------*/

class circleWall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.options = {
      restitution: 1,
      friction: 0,
      isStatic: true
    }
    this.color = "#1D3557";
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
      isStatic: true
    }
    this.vertices = vertices;
    this.color = "#1D3557";
    this.body = Bodies.fromVertices(this.x, this.y, this.vertices, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let firstVertex = this.vertices[0];
    ctx.moveTo(firstVertex.x + this.x, firstVertex.y + this.y);
    for (let vertex of this.vertices) {
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
      isStatic: true
    }
    this.width = width;
    this.height = height;
    this.color = "#1D3557";
    this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
    World.add(world, this.body);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
  }
}

/*---------- Checker ----------*/

class Checker {
  constructor(x, y, width, height, left = true, right = true) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#1D3557";
    this.walls = []
    if (left) {
      this.walls.push(new SquareWall(this.x - this.width / 2, this.y, 4, height));
    }
    if (right) {
      this.walls.push(new SquareWall(this.x + this.width / 2, this.y, 4, height));
    }
  }

  draw() {
    for (let wall of this.walls) {
      wall.draw();
    }
  }
}

/*---------- Game ----------*/

class Plinko {
  constructor() {
    this.balls = [];
    this.generateWalls();
  }

  generateWalls() {

    this.walls = [];
    let rows = 5;
    let cols = 8;
    let offsetX = width / (rows + 1);
    let offsetY = height * 0.8 / (cols + 1);
    let offsetYAbs = offsetY + height * 0.1;

    let vertices = [{ x: 0, y: -offsetY }, { x: offsetX * 0.5, y: 0 }, { x: 0, y: offsetY }, { x: -offsetX * 0.5, y: 0 }];
    for (let i = 0; i < cols; i++) {

      let counter = rows - (i % 2);
      let offsetRow = offsetX + offsetX * (i % 2) * 0.5;

      if (i % 2) {
        let y = offsetYAbs + offsetY * i;
        this.walls.push(new ShapeWall(0, y, vertices));
        this.walls.push(new ShapeWall(width, y, vertices));
        if (cols - i <= 2) {
          this.walls.push(new SquareWall(0, height - (height - y) * 0.5, offsetX, height - y));
          this.walls.push(new SquareWall(width, height - (height - y) * 0.5, offsetX, height - y));
        }
      }

      for (let j = 0; j < counter; j++) {
        let x = offsetRow + offsetX * j;
        let y = offsetYAbs + offsetY * i;
        this.walls.push(new circleWall(x, y));
      }

    }

    //Borders
    let wallLeft = new SquareWall(0, height * 0.5, 8, height);
    let wallRight = new SquareWall(width, height * 0.5, 8, height);
    let wallTop = new SquareWall(width * 0.5, 0, width, 8);
    let wallBottom = new SquareWall(width * 0.5, height, width, 8);
    this.walls.push(wallLeft);
    this.walls.push(wallRight);
    this.walls.push(wallTop);
    this.walls.push(wallBottom);

    //Checkers
    for (let i = 1; i <= rows; i++) {
      let left = i == 1 ? false : true;
      let right = i == rows ? false : true;
      this.walls.push(new Checker(offsetX * i, height * 0.95, offsetX, height * 0.1, left, right));
    }

  }

  addBall(x, y) {
    if (y < height * 0.15) {
      let ball = new Ball(x, y);
      this.balls.push(ball);
    }
  }

  step() {
    Engine.update(engine);
    this.draw();
  }

  draw() {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#A8DADC";
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    for (let wall of this.walls) {
      wall.draw();
    }
    for (let ball of this.balls) {
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
