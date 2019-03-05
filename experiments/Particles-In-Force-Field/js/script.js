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

  reset();
});

// --------------------------------------------------------------------

const colors = ["#E6207C", "#6DED4A", "#3518F2", "#03051C", "#8367C7", "#7218FF", "#F9C80E", "#F86624", "#87F7D2", "#FFFFFF"];
randomColor = () => colors[Math.floor(Math.random() * colors.length)];

document.addEventListener('mousemove', (e) => {
  let mouseX = e.pageX - offSetLeft;
  let mouseY = e.pageY - offSetTop;
  system.setMousePos(mouseX, mouseY);
});
canvas.addEventListener('mousedown', () => {
  system.forceFieldActive = true;
});
canvas.addEventListener('mouseup', () => {
  system.forceFieldActive = false;
});

function distanceBetween(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function limit(number, limit) {
  number = number > limit ? limit : number;
  return number;
}

class Particle {
  constructor() {
    let x = Math.random() * width;
    let y = Math.random() * height;
    this.pos = new Vector(x, y);
    let angle = Math.random() * 2 * Math.PI;
    let speedX = 2 * Math.cos(angle);
    let speedY = 2 * Math.sin(angle);
    this.velocity = new Vector(speedX, speedY);
    this.aceleration = new Vector(0, 0);
    this.radius = Math.random() * 8 + 1;
    this.radius2 = 0;
    this.color = randomColor();
  }

  step() {
    this.velocity.add(this.aceleration);
    this.pos.add(this.velocity);

    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }

    this.aceleration = new Vector(0, 0);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius + this.radius2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class ParticleSystem {
  constructor(particles) {
    this.mousePos = new Vector(0, 0);
    this.forceFieldActive = false;
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.forceFieldRadius = 200;
    this.particles = [];
    for (var i = 0; i < particles; i++) {
      this.particles.push(new Particle);
    }
  }

  setMousePos(x, y) {
    this.mousePos = new Vector(x, y);
  }

  step() {
    for (let particle of this.particles) {
      let desired = Vector.sub(this.mousePos, particle.pos);
      let rescaledDistance = Vector.mult(desired, 0.005);
      let radius2 = 30 / Math.exp(rescaledDistance.mag());
      particle.radius2 = radius2;
      if (desired.mag() < this.forceFieldRadius) {
        if (this.forceFieldActive) {
          desired.setMag(-this.maxSpeed);
          let steering = Vector.sub(desired, particle.velocity);
          steering.limit(this.maxForce);
          particle.aceleration = steering;
        }
      }
    }
    for (let particle of this.particles) {
      particle.step();
    }
  }

  draw() {
    ctx.globalCompositeOperation = "lighter"
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff"
    for (let particle of this.particles) {
      particle.draw();
    }
  }
}

let system;

function reset() {
  let particles = Math.floor((width * height) / 6000);
  system = new ParticleSystem(particles);
}

function loop() {
  requestAnimationFrame(loop);
  system.step();
  system.draw();
}

reset();
loop();
