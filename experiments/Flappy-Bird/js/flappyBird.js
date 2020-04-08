class flappyBird {
  constructor() {
    this.reset();
    this.background = new Background();
    this.gravity = 0.4;
    this.jumpForce = -7;
  }

  reset() {
    this.bird = new Bird();
    this.walls = [];

    this.shouldTheBirdJump = false;

    this.counter = 200;
    this.maxCounter = 200;
    this.playing = false;
  }

  addJump() {
    this.shouldTheBirdJump = true;
  }

  step() {
    if (this.playing) {
      if (this.bird.isColliding(this.walls)) {
        this.reset();
      }
      if (this.bird.y > height) {
        this.reset();
      }

      this.bird.applyForce(this.gravity);
      if (this.shouldTheBirdJump) {
        this.bird.resetVelocity();
        this.bird.applyForce(this.jumpForce);
        this.shouldTheBirdJump = false;
      }

      this.bird.step();
      this.background.step();
      for (const wall of this.walls) {
        wall.step();
      }

      if (this.walls.length > 8) {
        this.walls.shift();
      }

      if (this.counter > this.maxCounter) {
        this.counter = 0;
        this.walls.push(new Wall());
      }
      this.counter += 1;
    }
  }

  draw() {
    this.background.draw();
    this.bird.draw();
    for (const wall of this.walls) {
      wall.draw();
    }
  }
}
