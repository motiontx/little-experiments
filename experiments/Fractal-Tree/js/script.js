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

  resetToStep()

});

// --------------------------------------------------------------------

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  };

  graph() {
    ctx.beginPath();
    ctx.lineTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  children() {
    let children = [];

    let a = new Vector();
    a.add(this.end);
    a.sub(this.start);
    a.rotate(0.4);
    a.mult(0.8);
    a.add(this.end);

    let b = new Vector();;
    b.add(this.end);
    b.sub(this.start);
    b.rotate(-0.4)
    b.mult(0.8);
    b.add(this.end);

    children.push(new Line(this.end, a));
    children.push(new Line(this.end, b));

    return children;
  }
};

class FractalTree {
  constructor() {
    this.limit = 10;
    this.iteration = 0;
    this.lines = [];
    this.lastLines = [];
    let start = new Vector(width * 0.5, height);
    let end = new Vector(width * 0.5, height * 0.8);
    let firstLine = new Line(start, end);
    this.lines.push(firstLine);
    this.lastLines.push(firstLine);

    this.graph();
  }

  graph() {
    ctx.clearRect(0, 0, width, height);
    for (let line of this.lines) {
      line.graph();
    }
  }

  step() {
    if (this.iteration < this.limit) {
      let newLines = [];
      for (let line of this.lastLines) {
        for (let child of line.children()) {
          newLines.push(child);
        }
      }
      for (let newLine of newLines) {
        this.lines.push(newLine);
      }
      this.lastLines = newLines;
      this.iteration++;
    }
  }
}

let curve = new FractalTree();

function step() {
  curve.step();
  curve.graph();
}

function reset() {
  curve = new FractalTree();
  curve.graph();
}

function resetToStep() {
  let interation = curve.iteration;
  curve = new FractalTree();
  for (let i = 0; i < interation; i++) {
    curve.step();
  }
  curve.graph();
}
