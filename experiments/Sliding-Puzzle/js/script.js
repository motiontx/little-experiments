// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

function create() {

}

class Game {
  constructor() {
    this.size = 3;
    this.movements = 0;
    this.playing = false;

    this.matrix = [];

    this.board = document.getElementById('pieces');
    this.boardMovements = document.getElementById('movements');
    this.boardTime = document.getElementById('timer');

    this.reset();

  }

  reset(){
    this.playing = false;

    this.resetTimer();
    this.resetMovements()

    this.resetMatrix();
    this.resetBoard();
  }

  startTimer() {
    this.startTime = new Date()
    this.timer = setInterval(() => {
      this.boardTime.innerHTML = ((new Date() - game.startTime) / 1000).toFixed(2)
    }, 100)
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = false;
    this.boardTime.innerHTML = '0.00'
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = false;
  }

  resetMovements(){
    this.movements = 0;
    this.updateBoardMovements();
  }

  updateBoardMovements(){
    this.boardMovements.innerHTML = this.movements;
  }

  resetMatrix(){
    let matrix = [];
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(j+(i*this.size)+1);
      }
      matrix.push(row);
    }
    matrix[this.size-1][this.size-1] = -1
    this.matrix = matrix;
  }

  resetBoard(){

    this.board.innerHTML = "";
    let pieceLength = 100/this.size;

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        let number = this.matrix[i][j];
        if (number != -1) {

          let div = document.createElement('div');
          div.innerHTML = number;
          div.className = "piece";
          div.style.width = div.style.height = `${pieceLength}%`
          div.style.top = `${i*pieceLength}%`;
          div.style.left = `${j*pieceLength}%`;

          div.setAttribute('x', j);
          div.setAttribute('y', i);

          div.addEventListener('click', (el) => {
            this.movePiece(el.target);
          });

          this.board.appendChild(div);
        }
      }
    }

    this.updateBoardMovements();
  }

  movePiece(piece){
    let x = parseInt(piece.getAttribute('x'));
    let y = parseInt(piece.getAttribute('y'));
    let pieceLength = 100/this.size;
    let newPos = this.NeighborIsEmpty(x,y);
    if (newPos) {

      if (!this.playing) {
        this.startPlaying();
      }

      let n = this.matrix[y][x];
      this.matrix[newPos.y][newPos.x] = n;
      this.matrix[y][x] = -1;
      piece.setAttribute('x', newPos.x);
      piece.setAttribute('y', newPos.y);
      piece.style.top = `${newPos.y*pieceLength}%`;
      piece.style.left = `${newPos.x*pieceLength}%`;

      this.movements++;
      this.updateBoardMovements();

      if (this.checkIfIWin()) {
        this.gameWon();
      }

    }
  }

  NeighborIsEmpty(x,y){
    if (y - 1 >= 0 && this.matrix[y - 1][x] == -1) return {x: x, y: y-1};
    else if (x + 1 < this.size && this.matrix[y][x + 1] == -1) return {x: x+1, y: y};
    else if (y + 1 < this.size && this.matrix[y + 1][x] == -1) return {x: x, y: y+1};
    else if (x - 1 >= 0 && this.matrix[y][x - 1] == -1) return {x: x-1, y: y};
    return false;
  }

  startPlaying(){
    this.resetTimer();
    this.resetMovements();
    this.startTimer();
    this.playing = true;
  }

  checkIfIWin(){
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i == this.size-1 && j == this.size-1) {
          if (this.matrix[i][j] != -1) {
            return false;
          }
        }
        else if (this.matrix[i][j] != j+(i*this.size)+1) {
          return false;
        }
      }
    }
    return true;
  }

  gameWon() {
    this.pauseTimer();
    this.playing = false;
    console.log("ganaste");
  }

}

let game = new Game();
