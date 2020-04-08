// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const numbers = ['🔸', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

function shuffle(array) {
  let j;
  let x;
  let i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

class Minesweeper {
  constructor(width, height, mines, twemoji = true) {
    this.twemoji = twemoji;
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.gridView = document.getElementById('grid');
    this.stateView = document.getElementById('state');
    this.minesView = document.getElementById('mines');
    this.time = document.getElementById('timer');
    this.reset();
  }

  reset(w = this.width, h = this.height, m = this.mines, t = this.twemoji) {
    // Reset the game
    this.twemoji = t;
    this.width = w;
    this.height = h;
    this.mines = m;

    this.playing = true;
    this.iWin = false;
    this.grid = [];
    this.checkedCells = this.mines;

    let mines = [];
    let count = this.mines;
    for (let i = 0; i < this.width * this.height; i += 1) {
      count > 0 ? mines.push(true) : mines.push(false);
      count -= 1;
    }
    mines = shuffle(mines);

    for (let i = 0; i < this.height; i += 1) {
      const row = [];
      for (let j = 0; j < this.width; j += 1) {
        row.push(new Cell(j, i, mines[i * this.width + j], this.twemoji));
      }
      this.grid.push(row);
    }

    this.resetTimer();
    this.updateMinesNearby();
    this.bindEvents();
    this.showGrid();
    this.updateView();
  }

  startTimer() {
    this.startTime = new Date();
    this.timer = setInterval(() => {
      this.time.innerHTML = ((new Date() - game.startTime) / 1000).toFixed(2);
    }, 100);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = false;
    this.time.innerHTML = '0.00';
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = false;
  }

  revealAll() {
    // Reveals all the cells
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell.isMine && this.iWin) {
          cell.check(true);
        } else {
          cell.reveal();
        }
      }
    }
    this.updateView();
  }

  updateMinesNearby() {
    // Updates the number of nearby mines in each cell of the grid
    for (const row of this.grid) {
      for (const cell of row) {
        let count = 0;
        for (const neighbor of this.neighbors(cell)) {
          if (neighbor.isMine) {
            count++;
          }
        }
        cell.numberOfMinesNearby = count;
      }
    }
  }

  showGrid() {
    // Shows the grid in the DOM
    this.gridView.innerHTML = '';
    for (let i = 0; i < this.height; i += 1) {
      const row = document.createElement('div');
      row.className = 'row_grid';
      for (let j = 0; j < this.width; j += 1) {
        row.appendChild(this.grid[i][j].view);
      }
      this.gridView.appendChild(row);
    }
  }

  bindEvents() {
    // Set DOM Events
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        const cellView = this.grid[i][j].view;

        cellView.addEventListener('click', () => {
          if (!this.timer && this.playing) {
            this.startTimer();
          }
          const cell = this.getCellFromDOM(cellView);
          this.play(cell);
        });
        cellView.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (!this.timer && this.playing) {
            this.startTimer();
          }
          const cell = this.getCellFromDOM(cellView);
          this.checkCell(cell);
        });
      }
    }
  }

  updateView() {
    // Update the DOM with the object data
    let emoji;
    if (this.playing) {
      emoji = '😀';
    } else {
      emoji = this.iWin ? '😎' : '😵';
    }
    this.stateView.innerHTML = this.twemoji ? twemoji.parse(emoji) : emoji;
    this.minesView.innerHTML = `${this.checkedCells}/${this.mines}`;
  }

  neighbors(cell) {
    // returns neighbor cells
    const { x } = cell;
    const { y } = cell;
    const neighbors_cords = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ];
    const neighbors = [];
    for (const cord of neighbors_cords) {
      if (cord[0] < this.width && cord[0] >= 0 && cord[1] < this.height && cord[1] >= 0) {
        neighbors.push(this.grid[cord[1]][cord[0]]);
      }
    }
    return neighbors;
  }

  revealNeighbors(cell) {
    // Reveals all possible neighboring cells << Recursive function! >>
    if (!cell.revealed && !cell.isMine && !cell.checked) {
      cell.reveal();
      if (cell.numberOfMinesNearby == 0) {
        for (const neighbor of this.neighbors(cell)) {
          this.revealNeighbors(neighbor);
        }
      }
    }
  }

  play(cell) {
    // Reveals neighboring cells, then check if the player won or not
    if (this.playing) {
      if (!cell.checked) {
        if (cell.isMine) {
          this.gameOver();
        } else {
          this.revealNeighbors(cell);
        }
      }
      if (this.checkIfIWin()) {
        this.gameWon();
      }
    }
  }

  checkCell(cell) {
    // Mark a cell, then check if the player won
    if (this.playing && !cell.revealed) {
      cell.check();
      cell.checked ? this.checkedCells-- : this.checkedCells++;
      if (this.checkIfIWin()) {
        this.gameWon();
      }
      this.updateView();
    }
  }

  checkIfIWin() {
    // Returns true if the player won the game
    let count = 0;
    for (const row of this.grid) {
      for (const cell of row) {
        if (!cell.revealed) {
          cell.isMine ? count++ : count--;
        }
      }
    }
    return count == this.mines;
  }

  gameOver() {
    this.pauseTimer();
    this.playing = false;
    this.iWin = false;
    this.revealAll();
  }

  gameWon() {
    this.pauseTimer();
    this.playing = false;
    this.iWin = true;
    this.checkedCells = 0;
    this.revealAll();
  }

  getCellFromDOM(cellView) {
    // Returns the cell object that corresponds to a cell in the DOM
    let x;
    let y;
    for (const el of cellView.classList) {
      if (el[0] == 'x') {
        x = parseInt(el.substr(2));
      }
      if (el[0] == 'y') {
        y = parseInt(el.substr(2));
      }
    }
    return this.grid[y][x];
  }
}
