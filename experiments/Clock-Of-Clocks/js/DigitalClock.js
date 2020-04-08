// I should refactor this later...

class DigitalClock {
  constructor() {
    this.hour = [new Digit(), new Digit()];
    this.minute = [new Digit(), new Digit()];
    this.second = [new Digit(), new Digit()];
  }

  setTime(h, m, s) {
    if (h < 9) {
      this.hour[0].type(0);
      this.hour[1].type(h);
    } else {
      this.hour[0].type(parseInt(h.toString()[0]));
      this.hour[1].type(parseInt(h.toString()[1]));
    }
    if (m < 9) {
      this.minute[0].type(0);
      this.minute[1].type(m);
    } else {
      this.minute[0].type(parseInt(m.toString()[0]));
      this.minute[1].type(parseInt(m.toString()[1]));
    }
    if (s < 9) {
      this.second[0].type(0);
      this.second[1].type(s);
    } else {
      this.second[0].type(parseInt(s.toString()[0]));
      this.second[1].type(parseInt(s.toString()[1]));
    }
  }

  set() {
    for (let i = 0; i < 108; i++) {
      var dot = new Clock();
      dot.set();
      dot.type(7);
    }
    for (let i = 0; i < 6; i++) {
      var dot = new Clock();
      dot.set();
      dot.type(7);
      this.hour[0].setLine(i);
      this.hour[1].setLine(i);
      var dot = new Clock();
      dot.set();
      dot.type(7);
      var dot = new Clock();
      dot.set();
      dot.type(7);
      this.minute[0].setLine(i);
      this.minute[1].setLine(i);
      var dot = new Clock();
      dot.set();
      dot.type(7);
      var dot = new Clock();
      dot.set();
      dot.type(7);
      this.second[0].setLine(i);
      this.second[1].setLine(i);
      var dot = new Clock();
      dot.set();
      dot.type(7);
    }
    for (let i = 0; i < 108; i++) {
      var dot = new Clock();
      dot.set();
      dot.type(7);
    }
  }
}
