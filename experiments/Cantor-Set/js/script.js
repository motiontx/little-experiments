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

    let v = Vector.sub(this.end, this.start);
    v.mult(1 / 3);

    let offsetY = new Vector(0,20);

    let a = new Vector();
    a.add(this.start);
    a.add(offsetY);
    let b = Vector.add(this.start, v);
    b.add(offsetY);
    let c = Vector.sub(this.end, v);
    c.add(offsetY);
    let d = new Vector();
    d.add(this.end);
    d.add(offsetY);

    children.push(new Line(a, b));
    children.push(new Line(c, d));

    return children;
  }
};

class CantorSet {
  constructor() {
    this.limit = 7;
    this.iteration = 0;
    this.lines = [];
    this.lastLines = [];
    let start = new Vector(0, height * 0.5 - 70);
    let end = new Vector(width, height * 0.5 - 70);
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

let curve = new CantorSet();

function step() {
  curve.step();
  curve.graph();
}

function reset() {
  curve = new CantorSet();
  curve.graph();
}

function resetToStep() {
  let interation = curve.iteration;
  curve = new CantorSet();
  for (let i = 0; i < interation; i++) {
    curve.step();
  }
  curve.graph();
}
