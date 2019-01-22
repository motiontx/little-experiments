const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_container = document.getElementById("canvas_container");

var offSetLeft = canvas.offsetLeft;
var offSetTop = canvas.offsetTop;
var width = canvas.width = canvas_container.clientWidth;
var height = canvas.height = canvas_container.clientHeight;

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
    ctx.stroke();
  };

  children() {
    let children = [];

    let v = Vector.sub(this.end,this.start);
    v.mult(1 / 3);

    let a = this.start;

    let b = Vector.add(this.start, v);
    let d = Vector.sub(this.end, v);

    v.rotate(-1.0472);
    let c = Vector.add(b,v);

    let e = this.end;

    children.push(new Line(this.start, b));
    children.push(new Line(b, c));
    children.push(new Line(c, d));
    children.push(new Line(d, this.end));

    return children;
  }
};

class KochCurve {
  constructor() {
    this.limit = 7;
    this.iteration = 0;
    this.lines = [];
    let start = new Vector(0, canvas.height * 0.90);
    let end = new Vector(canvas.width, canvas.height * 0.90);
    let firstLine = new Line(start, end);
    this.lines.push(firstLine);

    this.graph();
  }

  graph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.lines.forEach( line => {
      line.graph();
    });
  }

  step() {
    if (this.iteration < this.limit) {
      let newLines = [];
      this.lines.forEach((line) => {
        line.children().forEach((elem) => {
          newLines.push(elem);
        });
      });
      this.lines = newLines;
      this.iteration ++;
    }

  }
}

var curve = new KochCurve();

function step(){
  curve.step();
  curve.graph();
}

function reset(){
  curve = new KochCurve();
  curve.graph();
}

function resetToStep(){
  let interation = curve.iteration;
  curve = new KochCurve();
  for (let i = 0; i < interation; i++) {
    curve.step();
  }
  curve.graph();
}
