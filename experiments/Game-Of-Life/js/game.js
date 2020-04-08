// Game ---------------------------------------------------------------

class Game {
  constructor(width, height) {
    this.running = false;
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.current = newMatrix(this.width, this.height, false);
  }

  setRunningState(state) {
    this.running = state;
  }

  setValueOf(x, y, value) {
    this.current[y][x] = value;
  }

  currentState() {
    return this.current;
  }

  currentNeighborsOf(x, y) {
    let neighbors = 0;
    if (y - 1 >= 0 && this.current[y - 1][x]) neighbors += 1;
    if (y - 1 >= 0 && x - 1 >= 0 && this.current[y - 1][x - 1]) neighbors += 1;
    if (y - 1 >= 0 && x + 1 < this.width && this.current[y - 1][x + 1]) neighbors += 1;

    if (x - 1 >= 0 && this.current[y][x - 1]) neighbors += 1;
    if (x + 1 < this.width && this.current[y][x + 1]) neighbors += 1;

    if (x - 1 >= 0 && y + 1 < this.height && this.current[y + 1][x - 1]) neighbors += 1;
    if (y + 1 < this.height && this.current[y + 1][x]) neighbors += 1;
    if (y + 1 < this.height && x + 1 < this.width && this.current[y + 1][x + 1]) neighbors += 1;

    return neighbors;
  }

  step() {
    if (this.running) {
      const next = newMatrix(this.width, this.height, false);
      for (let i = 0; i < this.current.length; i += 1) {
        for (let j = 0; j < this.current[i].length; j += 1) {
          const neighbors = this.currentNeighborsOf(j, i);
          if (!this.current[i][j] && neighbors === 3) {
            next[i][j] = true;
          } else if (this.current[i][j] && (neighbors === 3 || neighbors === 2)) {
            next[i][j] = true;
          } else {
            next[i][j] = false;
          }
        }
      }
      this.current = next;
    }
  }
}
