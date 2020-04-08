// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

class Piece {
  constructor(x, y, color) {
    this.type = null;
    this.x = x;
    this.y = y;
    this.color = color;
    this.moved = false;
  }

  outOfRange(x, y) {
    return !!((x < 0 || y < 0 || x > 7 || y > 7));
  }

  getLegalMoves(otherPieces) {
    //
  }
}
