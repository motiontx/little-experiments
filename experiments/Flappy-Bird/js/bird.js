const imageBird = new Image();
imageBird.src = "assets/bird.png";

class Bird {
  constructor() {
    this.x = 65;
    this.y = height / 2;

    this.rY = 12;
    this.rX = 17;

    this.velocity = 0;
  }

  applyForce(force) {
    this.velocity += force;
  }

  resetVelocity() {
    this.velocity = 0;
  }

  step() {
    this.y += this.velocity;
  }

  isColliding(walls) {
    for (let wall of walls) {

      let sumX = this.x + this.rX;
      let subX = this.x - this.rX;
      let sumY = this.y + this.rY;
      let subY = this.y - this.rY;

      let x1 = wall.x - wall.width / 2;
      let x2 = wall.x + wall.width / 2;
      let y1 = wall.y - wall.height / 2;
      let y2 = wall.y + wall.height / 2;

      if (sumX > x1 && subX < x2 && (subY < y1 || sumY > y2)) {
        return true;
      }

    }
    return false;
  }

  draw() {
    ctx.drawImage(imageBird, this.x - 17, this.y - 17);
  }

}
