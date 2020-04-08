const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

const colors = ['#E6207C', '#6DED4A', '#3518F2', '#03051C', '#8367C7', '#7218FF', '#F9C80E', '#F86624', '#87F7D2', '#FFFFFF'];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

let system;

window.addEventListener('resize', () => {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;

  reset();
});

// --------------------------------------------------------------------

document.addEventListener('mousemove', (e) => {
  const mouseX = e.pageX - offSetLeft;
  const mouseY = e.pageY - offSetTop;
  system.setMousePos(mouseX, mouseY);
});
canvas.addEventListener('mousedown', () => {
  system.forceFieldActive = true;
});
canvas.addEventListener('mouseup', () => {
  system.forceFieldActive = false;
});

class Particle {
  constructor() {
    const x = Math.random() * width;
    const y = Math.random() * height;
    this.pos = new Vector(x, y);
    const angle = Math.random() * 2 * Math.PI;
    const speedX = 2 * Math.cos(angle);
    const speedY = 2 * Math.sin(angle);
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
    for (let i = 0; i < particles; i++) {
      this.particles.push(new Particle());
    }
  }

  setMousePos(x, y) {
    this.mousePos = new Vector(x, y);
  }

  step() {
    for (const particle of this.particles) {
      const desired = Vector.sub(this.mousePos, particle.pos);
      const rescaledDistance = Vector.mult(desired, 0.005);
      const radius2 = 30 / Math.exp(rescaledDistance.mag());
      particle.radius2 = radius2;
      if (desired.mag() < this.forceFieldRadius) {
        if (this.forceFieldActive) {
          desired.setMag(-this.maxSpeed);
          const steering = Vector.sub(desired, particle.velocity);
          steering.limit(this.maxForce);
          particle.aceleration = steering;
        }
      }
    }
    for (const particle of this.particles) {
      particle.step();
    }
  }

  draw() {
    ctx.globalCompositeOperation = 'lighter';
    ctx.clearRect(0, 0, width, height);
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}

function reset() {
  const particles = Math.floor((width * height) / 6000);
  system = new ParticleSystem(particles);
}

function loop() {
  requestAnimationFrame(loop);
  system.step();
  system.draw();
}

reset();
loop();
