// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

class Pawn extends Piece {
  constructor(...args) {
    super(...args);
    this.type = "pawn";
  }

  getLegalMoves(otherPieces) {
    let listOfLegalMoves = [];
    let x = this.x;
    let y = this.y;
    let nextCellFree;
    let nextNextCellFree;
    let eatLeft;
    let eatRight;
    if (this.color == "white") {

      if (!this.outOfRange(x,y-1)) {
        nextCellFree = !otherPieces.find(p => p.x == x && p.y == y - 1);
        if (nextCellFree) {
          listOfLegalMoves.push({
            x: this.x,
            y: this.y - 1
          })
        }
      }
      if (!this.outOfRange(x,y-2)) {
        nextNextCellFree = !otherPieces.find(p => p.x == x && p.y == y - 2);
        if (nextNextCellFree && nextCellFree) {
          listOfLegalMoves.push({
            x: this.x,
            y: this.y - 2
          })
        }
      }

      if (!this.outOfRange(x-1,y-1)) {
        eatLeft = otherPieces.find(p => p.x == x-1 && p.y == y - 1 && p.color == "black");
        if (eatLeft) {
          listOfLegalMoves.push({
            x: this.x-1,
            y: this.y - 1
          })
        }
      }
      if (!this.outOfRange(x+1,y-1)) {
        eatRight = otherPieces.find(p => p.x == x+1 && p.y == y - 1 && p.color == "black");
        if (eatRight) {
          listOfLegalMoves.push({
            x: this.x+1,
            y: this.y - 1
          })
        }
      }

    }

    return listOfLegalMoves;

  }

}
