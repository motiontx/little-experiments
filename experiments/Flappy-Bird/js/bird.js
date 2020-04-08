const imageBird_1 = new Image();
imageBird_1.src = 'assets/bird_1.png';

const imageBird_2 = new Image();
imageBird_2.src = 'assets/bird_2.png';

const imageBird_3 = new Image();
imageBird_3.src = 'assets/bird_3.png';

class Bird {
  constructor() {
    this.x = 65;
    this.y = height / 2;

    this.rY = 12;
    this.rX = 17;

    this.velocity = 0;

    this.counter = 0;
  }

  applyForce(force) {
    this.velocity += force;
  }

  resetVelocity() {
    this.velocity = 0;
  }

  step() {
    this.y += this.velocity;
    this.counter += 0.2;
  }

  isColliding(walls) {
    for (const wall of walls) {
      const sumX = this.x + this.rX;
      const subX = this.x - this.rX;
      const sumY = this.y + this.rY;
      const subY = this.y - this.rY;

      const x1 = wall.x - wall.width / 2;
      const x2 = wall.x + wall.width / 2;
      const y1 = wall.y - wall.height / 2;
      const y2 = wall.y + wall.height / 2;

      if (sumX > x1 && subX < x2 && (subY < y1 || sumY > y2)) {
        return true;
      }
    }
    return false;
  }

  draw() {
    switch (Math.floor(this.counter) % 3) {
      case 0:
        ctx.drawImage(imageBird_2, this.x - 17, this.y - 17);
        break;
      case 1:
        ctx.drawImage(imageBird_3, this.x - 17, this.y - 17);
        break;
      case 2:
        ctx.drawImage(imageBird_1, this.x - 17, this.y - 17);
        break;
      case 3:
        ctx.drawImage(imageBird_1, this.x - 17, this.y - 17);
        break;
    }
  }
}
