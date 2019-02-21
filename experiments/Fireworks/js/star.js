
class Spark {
  constructor() {
    this.x;
    this.y;
    this.angle;
    this.velocity;
    this.vx;
    this.vy;
    this.life;
  }
}


class Particle {
  constructor() {
    this.visible;
    this.heavy;
    this.x;
    this.y;
    this.angle;
    this.velocity;
    this.vx;
    this.vy;
    this.life;
    this.spinAngle;
    this.spinRadius;
    this.spinSpeed;
    this.sparkFreq;
    this.sparkLife;
    this.sparkSpeed;
    this.sparkColor;
    this.sparkLifeVariation;
    this.sparks = [];
    this.rocket;
  }
}

class Firework {
  constructor() {
    this.particles = [];
  }
}

class Sky {
  constructor() {
    this.fireworks = [];
  }
}
