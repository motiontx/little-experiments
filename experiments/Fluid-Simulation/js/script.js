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

const iter = 1;

class Fluid {
  constructor(n, timeStep, diffusionAmount, viscosity) {
    this.size = n;
    this.dt = timeStep;
    this.diff = diffusionAmount;
    this.visc;

    this.density = []; // n*n
    this.s = []; // n*n

    this.Vx = []; // n*n
    this.Vx0 = []; // n*n

    this.Vy = []; // n*n
    this.Vy0 = []; // n*n

  }

  ix(x, y) {
    return (x + y * this.size);
  }

  addDensity(x, y, amount) {
    this.density[ix(x, y)] += amount;
  }

  addVelocity(x, y, amountX, amountY) {
    int index = ix(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }

  diffuse(b, x, x0) {
    const a = this.dt * this.diff * (this.size - 2) * (this.size - 2);
    lin_solve(b, x, x0, a, 1 + 6 * a);
  }

  project(velocX, velocY, p, div) {
    // velocX, velocY, p arrays...
    for (let j = 1; j < this.size - 1; j++) {
      for (let i = 1; i < this.size - 1; i++) {
        div[ix(i, j)] = -0.5 * (velocX[ix(i + 1, j)] - velocX[ix(i - 1, j)] + velocY[ix(i, j + 1)] - velocY[ix(i, j - 1)]) / this.size;
        p[ix(i, j)] = 0;
      }
    }
    set_bnd(0, div);
    set_bnd(0, p);
    lin_solve(0, p, div, 1, 6);
    for (let j = 1; j < this.size - 1; j++) {
      for (let i = 1; i < this.size - 1; i++) {
        velocX[ix(i, j)] -= 0.5 * (p[ix(i + 1, j)] - p[ix(i - 1, j)]) * N;
        velocY[ix(i, j)] -= 0.5 * (p[ix(i, j + 1)] - p[ix(i, j - 1)]) * N;
      }
    }
    set_bnd(1, velocX);
    set_bnd(2, velocY);
  }

  advect(b, d, d0, velocX, velocY) {
    //d, d0 velocX, velocY arrays...
    let i0, i1, j0, j1;

    let dtx = this.dt * (N - 2);
    let dty = this.dt * (N - 2);

    let s0, s1, t0, t1;
    let tmp1, tmp2, x, y;

    let Nfloat = this.size;
    let ifloat, jfloat;
    let i, j;

    for (j = 1, jfloat = 1; j < N - 1; j++, jfloat++) {
      for (i = 1, ifloat = 1; i < N - 1; i++, ifloat++) {
        tmp1 = dtx * velocX[ix(i, j, k)];
        tmp2 = dty * velocY[ix(i, j, k)];
        x = ifloat - tmp1;
        y = jfloat - tmp2;

        if (x < 0.5) x = 0.5;
        if (x > Nfloat + 0.5) x = Nfloat + 0.5;
        i0 = Math.floor(x);
        i1 = i0 + 1.0;
        if (y < 0.5) y = 0.5;
        if (y > Nfloat + 0.5) y = Nfloat + 0.5 f;
        j0 = Math.floor(y);
        j1 = j0 + 1.0 f;

        s1 = x - i0;
        s0 = 1.0 - s1;
        t1 = y - j0;
        t0 = 1.0 - t1;

        let i0i = i0;
        let i1i = i1;
        let j0i = j0;
        let j1i = j1;

        d[ix(i, j)] =
          s0 * (t0 * d0[ix(i0i, j0i)]) +
          (t1 * d0[ix(i0i, j1i)]) +
          s1 * (t0 * d0[ix(i1i, j0i)] +
            (t1 * d0[ix(i1i, j1i)])
          }
      }
      set_bnd(b, d);
    }

  }

  lin_solve(b, x, x0, a, c) {
    // x and x0 array...
    let cRecip = 1.0 / c;
    for (let k = 0; k < iter; k++) {
      for (let j = 1; j < this.size - 1; j++) {
        for (let i = 1; i < this.size - 1; i++) {
          x[ix(i, j)] = (x0[ix(i, j)] + a * (x[ix(i + 1, j)] + x[ix(i - 1, j)] + x[ix(i, j + 1)] + x[ix(i, j - 1)])) * cRecip;
        }
      }
      //set_bnd(b, x, this.size);
    }
  }

  set_bnd(int b, x, int N) {
    // x array...
    for (int k = 1; k < N - 1; k++) {
      for (int i = 1; i < N - 1; i++) {
        x[ix(i, 0)] = b == 2 ? -x[ix(i, 1)] : x[ix(i, 1)];
        x[ix(i, N - 1)] = b == 2 ? -x[ix(i, N - 2)] : x[ix(i, N - 2)];
      }
    }
    for (int k = 1; k < N - 1; k++) {
      for (int j = 1; j < N - 1; j++) {
        x[ix(0, j)] = b == 1 ? -x[ix(1, j)] : x[ix(1, j)];
        x[ix(N - 1, j)] = b == 1 ? -x[ix(N - 2, j)] : x[ix(N - 2, j)];
      }
    }
    //
    // x[ix(0, 0)] = 0.5 * (x[ix(1, 0, 0)] +
    //   x[ix(0, 1)] +
    //   x[ix(0, 0)]);
    // x[ix(0, N - 1)] = 0.5 * (x[ix(1, N - 1, 0)] +
    //   x[ix(0, N - 2)] +
    //   x[ix(0, N - 1)]);
    // x[ix(N - 1, 0)] = 0.5 * (x[ix(N - 2, 0, 0)] +
    //   x[ix(N - 1, 1)] +
    //   x[ix(N - 1, 0)]);
    // x[ix(N - 1, N - 1)] = 0.5 * (x[ix(N - 2, N - 1, 0)] +
    //   x[ix(N - 1, N - 2)] +
    //   x[ix(N - 1, N - 1)]);
  }

}
