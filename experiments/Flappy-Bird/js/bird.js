class Bird {
  constructor() {
    this.x = 65;
    this.y = height/2;

    this.r = 5;

    this.velocity = 0;
  }

  applyForce(force){
    this.velocity += force;
  }

  resetVelocity(){
    this.velocity = 0;
  }

  step(){
    this.y += this.velocity;
  }

  isColliding(walls){

  }

  draw(){
    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

}
