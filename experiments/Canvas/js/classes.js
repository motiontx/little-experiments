class Point {
  constructor(x, y) {
    const xStart = Math.random() * width;
    const yStart = Math.random() * height;
    this.pos = new Vector(xStart, yStart);
    this.end = new Vector(x + Math.random() * 16 - 8, y + Math.random() * 16 - 8);
    this.r = Math.random() * 5 + 1;
    this.active = true;

    const c1 = Math.floor(Math.random() * 256);
    const c2 = Math.floor(Math.random() * 256);

    this.light = 2 * c2 - c1;

    this.color = `rgba(${c2}, ${c1}, ${c2}, 0.8)`;
  }

  step() {
    if (this.active) {
      const distVec = Vector.sub(this.end, this.pos);
      const dist = distVec.mag();
      distVec.mult(0.05);
      this.pos.add(distVec);
      if (dist < this.r) {
        this.active = false;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Drawing {
  constructor() {
    this.points = [];
  }

  addPoint(point) {
    this.points.push(point);
  }

  sort() {
    this.points.sort((a, b) => a.light - b.light);
  }

  step() {
    for (const point of this.points) {
      point.step();
    }
  }

  draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    for (const point of this.points) {
      point.draw();
    }
  }
}
