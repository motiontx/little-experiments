const imageBackground = new Image();
imageBackground.src = "assets/background.png";

class Background {
  constructor() {
    this.counter = 0;
  }

  step() {
    this.counter += 0.5;
    if (this.counter > 288) {
      this.counter = 0;
    }
  }

  draw() {
    ctx.fillStyle = "#8ec4cc";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(imageBackground, 0 - this.counter, height - 202);
  }
}
