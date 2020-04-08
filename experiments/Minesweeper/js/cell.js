class Cell {
  constructor(x, y, isMine, twemoji = true) {
    this.twemoji = twemoji;
    this.x = x;
    this.y = y;
    this.revealed = false;
    this.isMine = isMine;
    this.checked = false;
    this.numberOfMinesNearby = 0;
    this.view = document.createElement('div');
    this.view.className = `cell no_revealed x_${x} y_${y}`;
    this.updateView();
  }

  reveal() {
    // Reveals the cell
    this.revealed = true;
    this.updateView();
  }

  check(check) {
    // Check the cell
    this.checked = check || !this.checked;
    this.updateView();
  }

  updateView() {
    // Update the DOM with the object data
    let emoji;
    if (this.revealed) {
      this.view.classList.remove('no_revealed');
      this.view.classList.add('revealed');
      emoji = this.isMine ? '💣' : numbers[this.numberOfMinesNearby];
    } else if (this.checked) {
      emoji = '🚩';
    } else {
      emoji = '';
    }
    this.view.innerHTML = this.twemoji ? twemoji.parse(emoji) : emoji;
  }
}
