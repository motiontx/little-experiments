const numbers = ['▪️','1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

class Minesweeper {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gridView = document.getElementById('grid');
    this.state = document.getElementById('state')
    this.reset();

  }
  reset() {
    this.playing = true;
    this.grid = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(j, i));
      }
      this.grid.push(row);
    }
    //por ahora...
    this.grid[5][4].isMine = true;
    this.grid[5][5].isMine = true;
    this.grid[3][4].isMine = true;
    this.grid[1][2].isMine = true;

    this.updateMinesNearby();
    this.showGrid();
    this.updateView();
    this.bindEvents();

  }

  updateView(){
    this.state.innerHTML = this.playing ? '😋' : '😔'
  }

  showGrid() {
    this.gridView.innerHTML = '';
    for (let i = 0; i < this.height; i++) {
      let row = document.createElement('div');
      row.className = 'row_grid';
      for (let j = 0; j < this.width; j++) {
        row.appendChild(this.grid[i][j].view);
      }
      this.gridView.appendChild(row);
    }
  }

  neighbors(cell) {
    let x = cell.x;
    let y = cell.y;
    let neighbors_cords = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ];
    let neighbors = [];
    for (let cord of neighbors_cords) {
      if (cord[0] < this.width && cord[0] >= 0 && cord[1] < this.height && cord[1] >= 0) {
        neighbors.push(this.grid[cord[1]][cord[0]])
      }
    }
    return neighbors;
  }

  updateMinesNearby(){
    for (let row of this.grid) {
      for (let cell of row) {
        let count = 0;
        for (let neighbor of this.neighbors(cell)) {
          if (neighbor.isMine) {
            count++;
          }
        }
        cell.numberOfMinesNearby = count;
      }
    }
  }

  play(cell){
    if (cell.isMine) {
      this.gameOver();
    }else {
      this.revealNeighbors(cell);
    }
  }

  gameOver(){
    this.playing = false;
    for (let row of this.grid) {
      for (let cell of row) {
          cell.reveal();
      }
    }
    this.updateView();
  }

  revealNeighbors(cell){
    if (!cell.revealed) {
      if (!cell.isMine){
        cell.reveal();
        if (cell.numberOfMinesNearby == 0) {
          for (let neighbor of this.neighbors(cell)) {
              this.revealNeighbors(neighbor);
          }
        }
      }
    }
  }

  bindEvents(){
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let cell = this.grid[i][j].view;
        cell.addEventListener('click', () => {
          let x;
          let y;
          for (let el of cell.classList) {
            if (el[0] == "x") {
              x = parseInt(el.substr(2));
            }
            if (el[0]== "y") {
              y = parseInt(el.substr(2));
            }
          }
          this.play(this.grid[y][x]);
        });
      }
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.revealed = false;
    this.isMine = false;
    this.numberOfMinesNearby = 0;
    this.view = document.createElement('div');
    this.view.className = `cell no_revealed x_${x} y_${y}`;
    this.updateView();
  }
  reveal() {
    this.revealed = true;
    this.updateView();
  }

  updateView(){
    if (this.revealed) {
      this.view.classList.remove("no_revealed");
      this.view.classList.add("revealed");
      this.view.innerHTML = this.isMine ? '💣' : numbers[this.numberOfMinesNearby];
    }
  }
}
