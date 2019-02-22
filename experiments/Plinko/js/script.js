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

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

const engine = Engine.create();
const world = engine.world;

// Events
canvas.addEventListener("click", (evt) => {
  let x = evt.clientX - offSetLeft;
  let y = evt.clientY - offSetTop;
  game.addBall(x, y);
});

canvas.addEventListener('touchstart', () => {
  let x = evt.touches[0].clientX - offSetLeft;
  let y = evt.touches[0].clientY - offSetTop;
  game.addBall(x, y);
});

class Ball {
  constructor(x, y) {
    this.r = 5;
    this.color = "#b7dd25";
    this.body = Matter.Bodies.circle(x, y, this.r);
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

class Plinko {
  constructor() {
    this.balls = [];
  }

  addBall(x, y) {
    let ball = new Ball(x, y);
    this.balls.push(ball);
  }

  step() {
    Engine.update(engine);
    this.draw();
  }

  draw() {
    ctx.clearRect(0, 0, width, height);
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
