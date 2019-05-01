const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById("canvas_container");

let offSetLeft = canvas_container.offsetLeft;
let offSetTop = canvas_container.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

let penDown = false;
let mouseX = 0;
let mouseY = 0;
let prevX = 0;
let prevY = 0;

const n = 80;
const RESOLUTION = width / n;

canvas.addEventListener("mousedown", () => penDown = true);
canvas.addEventListener("mouseup", () => penDown = false);
canvas.addEventListener("mousemove", (evt) => {
  prevX = mouseX;
  prevY = mouseY;
  mouseX = Math.floor((evt.clientX - offSetLeft) / RESOLUTION);
  mouseY = Math.floor((evt.clientY - offSetTop) / RESOLUTION);
});

// --------------------------------------------------------------------

class Fluid {
  constructor(n, timeStep, iterations, diffusionAmount, viscosity) {
    this.iter = iterations;
    this.size = n;
    this.dt = timeStep;
    this.diff = diffusionAmount;
    this.visc = viscosity;

    this.density = Array(this.size * this.size).fill(0);
    this.s = Array(this.size * this.size).fill(0);

    this.Vx = Array(this.size * this.size).fill(0);
    this.Vx0 = Array(this.size * this.size).fill(0);

    this.Vy = Array(this.size * this.size).fill(0);
    this.Vy0 = Array(this.size * this.size).fill(0);

  }

  ix(x, y) {
    return (x + y * this.size);
  }

  addDensity(x, y, amount) {
    this.density[this.ix(x, y)] += amount;
  }

  addVelocity(x, y, amountX, amountY) {
    let index = this.ix(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }

  renderD() {
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let color = this.density[this.ix(j,i)];
        ctx.fillStyle = `rgb(${color},${color},0)`;
        ctx.fillRect(j * RESOLUTION, i * RESOLUTION, RESOLUTION - 2, RESOLUTION - 2);
      }
    }
  }

  diffuse(b, x, x0) {
    const a = this.dt * this.diff * (this.size - 2) * (this.size - 2);
    this.lin_solve(b, x, x0, a, 1 + 6 * a);
  }

  project(velocX, velocY, p, div) {
    // velocX, velocY, p arrays...
    for (let j = 1; j < this.size - 1; j++) {
      for (let i = 1; i < this.size - 1; i++) {
        div[this.ix(i, j)] = -0.5 * (velocX[this.ix(i + 1, j)] - velocX[this.ix(i - 1, j)] + velocY[this.ix(i, j + 1)] - velocY[this.ix(i, j - 1)]) / this.size;
        p[this.ix(i, j)] = 0;
      }
    }
    this.set_bnd(0, div);
    this.set_bnd(0, p);
    this.lin_solve(0, p, div, 1, 6);
    for (let j = 1; j < this.size - 1; j++) {
      for (let i = 1; i < this.size - 1; i++) {
        velocX[this.ix(i, j)] -= 0.5 * (p[this.ix(i + 1, j)] - p[this.ix(i - 1, j)]) * this.size;
        velocY[this.ix(i, j)] -= 0.5 * (p[this.ix(i, j + 1)] - p[this.ix(i, j - 1)]) * this.size;
      }
    }
    this.set_bnd(1, velocX);
    this.set_bnd(2, velocY);
  }

  set_bnd(b, x) {
    // x array...
    for (let i = 1; i < this.size - 1; i++) {
      x[this.ix(i, 0)] = b == 2 ? -x[this.ix(i, 1)] : x[this.ix(i, 1)];
      x[this.ix(i, this.size - 1)] = b == 2 ? -x[this.ix(i, this.size - 2)] : x[this.ix(i, this.size - 2)];
    }
    for (let j = 1; j < this.size - 1; j++) {
      x[this.ix(0, j)] = b == 1 ? -x[this.ix(1, j)] : x[this.ix(1, j)];
      x[this.ix(this.size - 1, j)] = b == 1 ? -x[this.ix(this.size - 2, j)] : x[this.ix(this.size - 2, j)];
    }
    x[this.ix(0, 0)] = 0.5 * (x[this.ix(1, 0)] + x[this.ix(0, 1)]);
    x[this.ix(0, this.size - 1)] = 0.5 * (x[this.ix(1, this.size - 1, 0)] + x[this.ix(0, this.size - 2)]);
    x[this.ix(this.size - 1, 0)] = 0.5 * (x[this.ix(this.size - 2, 0)] + x[this.ix(this.size - 1, 1)]);
    x[this.ix(this.size - 1, this.size - 1)] = 0.5 * (x[this.ix(this.size - 2, this.size - 1, 0)] + x[this.ix(this.size - 1, this.size - 2)]);
  }

  advect(b, d, d0, velocX, velocY) {
    // d d0 velox velocy arrays...
    let i0, i1, j0, j1;

    let dtx = this.dt * (this.size - 2);
    let dty = this.dt * (this.size - 2);

    let s0, s1, t0, t1;
    let tmp1, tmp2, x, y;

    let ifloat, jfloat;
    let i, j;

    for (j = 1, jfloat = 1; j < this.size - 1; j++, jfloat++) {
      for (i = 1, ifloat = 1; i < this.size - 1; i++, ifloat++) {
        tmp1 = dtx * velocX[this.ix(i, j)];
        tmp2 = dty * velocY[this.ix(i, j)];
        x = ifloat - tmp1;
        y = jfloat - tmp2;

        if (x < 0.5) x = 0.5;
        if (x > this.size + 0.5) x = this.size + 0.5;
        i0 = Math.floor(x);
        i1 = i0 + 1.0;
        if (y < 0.5) y = 0.5;
        if (y > this.size + 0.5) y = this.size + 0.5;
        j0 = Math.floor(y);
        j1 = j0 + 1.0;

        s1 = x - i0;
        s0 = 1.0 - s1;
        t1 = y - j0;
        t0 = 1.0 - t1;

        let i0i = i0;
        let i1i = i1;
        let j0i = j0;
        let j1i = j1;

        d[this.ix(i, j)] =
          s0 * (t0 * d0[this.ix(i0i, j0i)] + t1 * d0[this.ix(i0i, j1i)]) +
          s1 * (t0 * d0[this.ix(i1i, j0i)] + t1 * d0[this.ix(i1i, j1i)]);
      }
    }
    this.set_bnd(b, d);
  }

  step() {

    let Vx = this.Vx;
    let Vy = this.Vy;
    let Vx0 = this.Vx0;
    let Vy0 = this.Vy0;
    let density = this.density;
    let s = this.s;


    this.diffuse(1, Vx0, Vx);
    this.diffuse(2, Vy0, Vy);

    this.project(Vx0, Vy0, Vx, Vy);

    this.advect(1, Vx, Vx0, Vx0, Vy0);
    this.advect(2, Vy, Vy0, Vx0, Vy0);

    this.project(Vx, Vy, Vx0, Vy0);

    this.diffuse(0, s, density);
    this.advect(0, density, s, Vx, Vy);
  }

  lin_solve(b, x, x0, a, c) {
    let cRecip = 1.0 / c;
    for (let k = 0; k < this.iter; k++) {
      for (let j = 1; j < this.size - 1; j++) {
        for (let i = 1; i < this.size - 1; i++) {
          x[this.ix(i, j)] =
            (x0[this.ix(i, j)] +
              a * (x[this.ix(i + 1, j)] +
                x[this.ix(i - 1, j)] +
                x[this.ix(i, j + 1)] +
                x[this.ix(i, j - 1)])) * cRecip;
        }
      }
      this.set_bnd(b, x);
    }
  }

}

const fluid = new Fluid(n, 0.1, 4, 0.000005, 0.000001);

const center = width*0.5/RESOLUTION;
let angle = 0;

function loop() {
  requestAnimationFrame(loop);
  fluid.step();
  fluid.renderD();

  if (penDown) {
    fluid.addDensity(mouseX, mouseY, 500);
    let dx = mouseX - prevX;
    let dy = mouseY - prevY;
    fluid.addVelocity(mouseX, mouseY, dx, dy);
  }

  let dx = Math.cos(angle);
  let dy = Math.sin(angle);
  angle += Math.random()*0.5 - 0.25;
  fluid.addDensity(center, center, 100);
  fluid.addDensity(center-1, center, 100);
  fluid.addDensity(center, center-1, 100);
  fluid.addDensity(center+1, center, 100);
  fluid.addDensity(center, center+1, 100);
  fluid.addDensity(center-1, center-1, 100);
  fluid.addDensity(center+1, center-1, 100);
  fluid.addDensity(center+1, center+1, 100);
  fluid.addDensity(center-1, center+1, 100);
  fluid.addVelocity(center, center, dx, dy);
}
loop();
