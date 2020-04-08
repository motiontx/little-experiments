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

  resetToStep();
});

// --------------------------------------------------------------------

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  graph() {
    ctx.beginPath();
    ctx.lineTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  children() {
    const children = [];

    const v = Vector.sub(this.end, this.start);
    v.mult(1 / 3);

    const b = Vector.add(this.start, v);
    const d = Vector.sub(this.end, v);

    v.rotate(-1.0472);
    const c = Vector.add(b, v);

    children.push(new Line(this.start, b));
    children.push(new Line(b, c));
    children.push(new Line(c, d));
    children.push(new Line(d, this.end));

    return children;
  }
}

class KochCurve {
  constructor() {
    this.limit = 7;
    this.iteration = 0;
    this.lines = [];
    const start = new Vector(0, height * 0.9);
    const end = new Vector(width, height * 0.9);
    const firstLine = new Line(start, end);
    this.lines.push(firstLine);

    this.graph();
  }

  graph() {
    ctx.clearRect(0, 0, width, height);
    for (const line of this.lines) {
      line.graph();
    }
  }

  step() {
    if (this.iteration < this.limit) {
      const newLines = [];
      for (const line of this.lines) {
        for (const child of line.children()) {
          newLines.push(child);
        }
      }
      this.lines = newLines;
      this.iteration++;
    }
  }
}

let curve = new KochCurve();

function step() {
  curve.step();
  curve.graph();
}

function reset() {
  curve = new KochCurve();
  curve.graph();
}

function resetToStep() {
  const interation = curve.iteration;
  curve = new KochCurve();
  for (let i = 0; i < interation; i++) {
    curve.step();
  }
  curve.graph();
}
