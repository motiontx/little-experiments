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

  reset();
});

// --------------------------------------------------------------------

let system;

function distanceBetween(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 2 + 0.5;
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
  }

  step() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    } else if (this.y > height) {
      this.y = 0;
    }
  }

  draw() {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class ParticleSystem {
  constructor(particles) {
    this.particles = [];
    for (let i = 0; i < particles; i++) {
      this.particles.push(new Particle());
    }
  }

  step() {
    for (const particle of this.particles) {
      particle.step();
    }
  }

  draw() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 2;
    for (const p1 of this.particles) {
      p1.draw();
      for (const p2 of this.particles) {
        const distance = distanceBetween(p1, p2);
        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p2.r},${p2.g},${p2.b},${25 / distance})`;
          ctx.stroke();
        }
      }
    }
  }
}

function reset() {
  const x = width / 150;
  const y = height / 150;
  const particles = Math.floor(x * y);
  system = new ParticleSystem(particles);
}

function loop() {
  requestAnimationFrame(loop);
  system.step();
  system.draw();
}

reset();

loop();
