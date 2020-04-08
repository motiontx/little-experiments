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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Walker {
  constructor(x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
    } else {
      this.randomizePosition();
    }
    this.r = 1;
    this.separation = 10;
  }

  randomizePosition() {
    const angle = Math.random() * 2 * Math.PI;
    this.x = Math.floor(Math.cos(angle) * 180 + width * 0.5);
    this.y = Math.floor(Math.sin(angle) * 180 + height * 0.5);
  }

  step() {
    this.x += randomIntFromInterval(-1, 1);
    this.y += randomIntFromInterval(-1, 1);
    if (this.x > width) {
      this.x = width;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > height) {
      this.y = height;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

  checkCollision(others) {
    for (const stuckWalker of others) {
      const dx = stuckWalker.x - this.x;
      const dy = stuckWalker.y - this.y;
      const squareDis = dx * dx + dy * dy;
      if (squareDis <= this.r * this.r * 4 + this.separation) {
        return true;
      }
    }
    return false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class World {
  constructor(walkers) {
    this.walkers = [];
    for (let i = 0; i < walkers; i++) {
      this.walkers.push(new Walker());
    }
    this.stuckWalkers = [new Walker(width * 0.5, height * 0.5)];
  }

  step(iterations) {
    for (let i = 0; i < iterations; i++) {
      for (const walker of this.walkers) {
        walker.step();
      }
      const toMove = this.walkers.filter((el) => el.checkCollision(this.stuckWalkers));
      for (const el of toMove) {
        this.walkers.splice(this.walkers.indexOf(el), 1);
        this.stuckWalkers.push(el);
      }
    }
  }

  draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ff1493';
    for (const walker of this.walkers) {
      walker.draw();
    }
    ctx.fillStyle = '#000';
    for (const walker of this.stuckWalkers) {
      walker.draw();
    }
  }
}

let world = new World(2000);

function reset() {
  world = new World(2000);
}

function loop() {
  requestAnimationFrame(loop);
  world.step(30);
  world.draw();
}

loop();
