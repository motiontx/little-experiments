// I should refactor this later...

class Clock {
  constructor() {
    this.id = `${Math.floor((Math.random() * 99999)).toString()}-${Math.floor((Math.random() * 99999)).toString()}`;
    this.code = `<div class="clock" id ="${this.id}">
                        <div class="innerClock">
                        <div class="hourHand"></div>
                        <div class="minuteHand"></div>
                        <div class="center"></div>
                      </div>
                    </div>`;
  }

  set() {
    $('.container').append(this.code);
  }

  type(type) {
    switch (type) {
      case 1:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(0deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(180deg)');
        break;
      case 2:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(-90deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(90deg)');
        break;
      case 3:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(-180deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(90deg)');
        break;
      case 4:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(-90deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(180deg)');
        break;
      case 5:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(0deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(90deg)');
        break;
      case 6:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(0deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(270deg)');
        break;
      case 7:
        $(`#${this.id} .hourHand`).css('transform', 'rotate(45deg)');
        $(`#${this.id} .minuteHand`).css('transform', 'rotate(225deg)');
        break;
    }
  }
}
