// I should refactor this later...

class Clock {
  constructor() {
    this.id = Math.floor((Math.random() * 99999)).toString() + "-" + Math.floor((Math.random() * 99999)).toString();
    this.code = `<div class="clock" id ="` + this.id + `">
                        <div class="innerClock">
                        <div class="hourHand"></div>
                        <div class="minuteHand"></div>
                        <div class="center"></div>
                      </div>
                    </div>`
  }

  set() {
    $(".container").append(this.code)
  }

  type(type) {
    switch (type) {
      case 1:
        $("#" + this.id + " .hourHand").css("transform", "rotate(0deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(180deg)");
        break;
      case 2:
        $("#" + this.id + " .hourHand").css("transform", "rotate(-90deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(90deg)");
        break;
      case 3:
        $("#" + this.id + " .hourHand").css("transform", "rotate(-180deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(90deg)");
        break;
      case 4:
        $("#" + this.id + " .hourHand").css("transform", "rotate(-90deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(180deg)");
        break;
      case 5:
        $("#" + this.id + " .hourHand").css("transform", "rotate(0deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(90deg)");
        break;
      case 6:
        $("#" + this.id + " .hourHand").css("transform", "rotate(0deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(270deg)");
        break;
      case 7:
        $("#" + this.id + " .hourHand").css("transform", "rotate(45deg)");
        $("#" + this.id + " .minuteHand").css("transform", "rotate(225deg)");
        break;
    }
  }

}

class Digit {
  constructor() {
    this.clocks = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(new Clock());
      }
      this.clocks.push(row);
    }
  }

  type(type) {
    let toSet = [];
    switch (type) {
      case 0:
        toSet = [
          [3, 2, 2, 2, 4],
          [1, 3, 2, 4, 1],
          [1, 1, 7, 1, 1],
          [1, 1, 7, 1, 1],
          [1, 5, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 1:
        toSet = [
          [7, 7, 7, 3, 4],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 5, 6]
        ];
        break;
      case 2:
        toSet = [
          [3, 2, 2, 2, 4],
          [5, 2, 2, 4, 1],
          [3, 2, 2, 6, 1],
          [1, 3, 2, 2, 6],
          [1, 5, 2, 2, 4],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 3:
        toSet = [
          [3, 2, 2, 2, 4],
          [5, 2, 2, 4, 1],
          [3, 2, 2, 6, 1],
          [5, 2, 2, 4, 1],
          [3, 2, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 4:
        toSet = [
          [3, 4, 7, 3, 4],
          [1, 1, 7, 1, 1],
          [1, 5, 2, 6, 1],
          [5, 2, 2, 4, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 5, 6]
        ];
        break;
      case 5:
        toSet = [
          [3, 2, 2, 2, 4],
          [1, 3, 2, 2, 6],
          [1, 5, 2, 2, 4],
          [5, 2, 2, 4, 1],
          [3, 2, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 6:
        toSet = [
          [3, 2, 2, 2, 4],
          [1, 3, 2, 2, 6],
          [1, 5, 2, 2, 4],
          [1, 3, 2, 4, 1],
          [1, 5, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 7:
        toSet = [
          [3, 2, 2, 2, 4],
          [5, 2, 2, 4, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 1, 1],
          [7, 7, 7, 5, 6]
        ];
        break;
      case 8:
        toSet = [
          [3, 2, 2, 2, 4],
          [1, 3, 2, 4, 1],
          [1, 5, 2, 6, 1],
          [1, 3, 2, 4, 1],
          [1, 5, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
      case 9:
        toSet = [
          [3, 2, 2, 2, 4],
          [1, 3, 2, 4, 1],
          [1, 5, 2, 6, 1],
          [5, 2, 2, 4, 1],
          [3, 2, 2, 6, 1],
          [5, 2, 2, 2, 6]
        ];
        break;
    }

    for (let i = 0; i < toSet.length; i++) {
      for (let j = 0; j < toSet[i].length; j++) {
        this.clocks[i][j].type(toSet[i][j]);
      }
    }

  }

  setLine(i) {
    for (let j = 0; j < this.clocks[i].length; j++) {
      this.clocks[i][j].set();
    }
  }

}

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

var clock = new DigitalClock();
clock.set();

function setTime() {

  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let seconds = now.getSeconds();

  clock.setTime(hour, minute, seconds);

  setTimeout(setTime, 1000);

}

setTime();
