// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

class Game {
  constructor() {
    this.pieces = [];
    this.resetBoard();

    this.setStandardGame();
  }

  // ----------------------------------------------------------------- //

  resetBoard() {
    this.boardMatrix = [];
    this.board = document.getElementById('board');
    this.board.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement("cell");

        cell.addEventListener('click', (el) => {
          let x = el.target.getAttribute('x');
          let y = el.target.getAttribute('y');
          this.actionAt(x, y);
        });

        cell.setAttribute("x", j);
        cell.setAttribute("y", i);
        this.board.appendChild(cell);
        row.push(cell);
      }
      this.boardMatrix.push(row);
    }
  }

  // ----------------------------------------------------------------- //

  updateBoard(legalMovements) {
    for (let row of this.boardMatrix) {
      for (let cell of row) {
        cell.className = "";
      }
    }

    for (let piece of this.pieces) {
      let x = piece.x;
      let y = piece.y;
      let cell = this.boardMatrix[y][x];
      cell.className = `${piece.type} ${piece.color}`

    }

    if (legalMovements) {
      for (let pos of legalMovements) {
        let x = pos.x;
        let y = pos.y;
        let cell = this.boardMatrix[y][x];
        cell.classList.add("legalMove");
      }
    }
  }

  // ----------------------------------------------------------------- //

  setEmpty() {
    this.pieces = [];
    this.updateBoard();
  };

  setStandardGame() {
    this.pieces = [];
    for (let j = 0; j < 8; j++) {
      this.pieces.push(new Pawn(j, 1, "black"));
      this.pieces.push(new Pawn(j, 6, "white"));
    }

    this.pieces.push(new Rook(0, 0, "black"));
    this.pieces.push(new Knight(1, 0, "black"));
    this.pieces.push(new Bishop(2, 0, "black"));
    this.pieces.push(new Queen(3, 0, "black"));
    this.pieces.push(new King(4, 0, "black"));
    this.pieces.push(new Bishop(5, 0, "black"));
    this.pieces.push(new Knight(6, 0, "black"));
    this.pieces.push(new Rook(7, 0, "black"));

    this.pieces.push(new Rook(0, 7, "white"));
    this.pieces.push(new Knight(1, 7, "white"));
    this.pieces.push(new Bishop(2, 7, "white"));
    this.pieces.push(new Queen(3, 7, "white"));
    this.pieces.push(new King(4, 7, "white"));
    this.pieces.push(new Bishop(5, 7, "white"));
    this.pieces.push(new Knight(6, 7, "white"));
    this.pieces.push(new Rook(7, 7, "white"));

    this.updateBoard();
  }

  // ----------------------------------------------------------------- //

  actionAt(x,y) {
    let piece = this.pieces.find(piece => piece.x == x && piece.y == y);
    let legalMoves = piece.getLegalMoves(this.pieces);
    this.updateBoard(legalMoves);
  }

}
