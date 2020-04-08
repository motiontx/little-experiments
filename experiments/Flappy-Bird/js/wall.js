const imageWallUp = new Image();
imageWallUp.src = 'assets/up.png';

const imageWallDown = new Image();
imageWallDown.src = 'assets/down.png';

class Wall {
  constructor() {
    this.x = width + 26;
    this.y = Math.random() * height * 0.6 + height * 0.2;

    this.width = 52;
    this.height = 120;
  }

  step() {
    this.x-=1;
  }

  draw() {
    ctx.drawImage(imageWallUp, this.x - this.width / 2, this.y - this.height / 2 - 800);
    ctx.drawImage(imageWallDown, this.x - this.width / 2, this.y + this.height / 2);
  }
}
