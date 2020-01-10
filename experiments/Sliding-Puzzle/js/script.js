// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

function create() {

}

class Game {
  constructor() {
    this.matrix = [];
    this.size = 3;
    this.movements = 0;

    this.board = document.getElementById('pieces');

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

  }

  movePiece(piece){

    let x = parseInt(piece.getAttribute('x'));
    let y = parseInt(piece.getAttribute('y'));
    let pieceLength = 100/this.size;
    let newPos = this.NeighborIsEmpty(x,y);
    if (newPos) {
      let number = this.matrix[y][x];
      this.matrix[newPos.y][newPos.x] = number;
      this.matrix[y][x] = -1;
      piece.setAttribute('x', newPos.x);
      piece.setAttribute('y', newPos.y);
      piece.style.top = `${newPos.y*pieceLength}%`;
      piece.style.left = `${newPos.x*pieceLength}%`;
    }

  }

  NeighborIsEmpty(x,y){
    if (y - 1 >= 0 && this.matrix[y - 1][x] == -1) return {x: x, y: y-1};
    else if (x + 1 < this.size && this.matrix[y][x + 1] == -1) return {x: x+1, y: y};
    else if (y + 1 < this.size && this.matrix[y + 1][x] == -1) return {x: x, y: y+1};
    else if (x - 1 >= 0 && this.matrix[y][x - 1] == -1) return {x: x-1, y: y};
    return false;
  }

  reset(){
    this.resetMatrix();
    this.resetBoard();
  }

}

let game = new Game();
game.reset();
