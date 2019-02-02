class flappyBird {
  constructor() {
    this.bird = new Bird();
    this.walls = [];

    this.gravity = 0.4;
    this.jumpForce = -7;

    this.shouldTheBirdJump = false;
  }

  reset(){
    this.bird = new Bird();
    this.walls = [];
  }

  addJump(){
    this.shouldTheBirdJump = true;
  }

  step(){
    if (this.bird.isColliding(this.walls)) {
      this.reset();
    }
    this.bird.applyForce(this.gravity);
    if (this.shouldTheBirdJump) {
      this.bird.resetVelocity();
      this.bird.applyForce(this.jumpForce);
      this.shouldTheBirdJump = false;
    }
    for (let wall of this.walls) {
      wall.step();
    }
    this.bird.step();
  }

  draw(){
    ctx.clearRect(0,0,width,height);
    this.bird.draw();
    for (let wall of this.walls) {
      wall.draw();
    }
  }
}
