// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

class Tile {
  constructor(width, height, x, y, color, id) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.desiredOffset = 0;
    this.id = id;

    this.domElement = document.createElement("div");
    this.domElement.classList.add("tile");
    this.domElement.classList.add(`tile-width-${this.width}`);
    this.domElement.style.setProperty("--tile-width", this.width);
    this.domElement.style.setProperty("--tile-height", this.height);
    this.domElement.style.setProperty("--tile-x", x);
    this.domElement.style.setProperty("--tile-y", y);
    this.domElement.style.setProperty("--tile-offset-x", `${this.offsetX}px`);
    this.domElement.style.setProperty("--tile-color", color);

    this.loop();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.domElement.style.setProperty("--tile-x", x);
    this.domElement.style.setProperty("--tile-y", y);
  }

  loop() {
    requestAnimationFrame(() => {
      if (this.desiredOffset !== this.offsetX) {
        const diff = Math.abs(this.desiredOffset - this.offsetX);
        if (this.desiredOffset > this.offsetX) {
          this.offsetX += diff < 20 ? diff : 20;
        } else if (this.desiredOffset < this.offsetX) {
          this.offsetX -= diff < 20 ? diff : 20;
        }

        this.domElement.style.setProperty(
          "--tile-offset-x",
          `${this.offsetX}px`
        );
      }
      this.loop();
    });
  }

  setOffsetX(offsetX) {
    this.desiredOffset = offsetX;
  }
}

class FallingPuzzle {
  constructor(board, options) {
    this.board = board;
    this.options = options;
    this.tiles = [];
    this.startClick = null;
    this.board.style.setProperty("--rows", this.options.rows);
    this.board.style.setProperty("--cols", this.options.cols);

    this.test = board.getBoundingClientRect();
    this.setEventsListeners();
  }

  setEventsListeners() {
    document.addEventListener("mousedown", (e) => {
      this.startClick = e.screenX;
      const tile = this.tiles.find((tile) => tile.domElement === e.target);
      this.currentTile = tile;
    });
    document.addEventListener("mouseup", (ee) => {
      this.startClick = null;
      if (this.currentTile) {
        this.currentTile.setOffsetX(0);
      }
      this.currentTile = null;
    });
    document.addEventListener("mousemove", (e) => {
      if (this.currentTile) {
        const off = e.screenX - this.startClick;
        console.log(Math.round(off / (this.test.width / this.options.rows)));
        this.currentTile.setOffsetX(off);
      }
    });
  }

  addRow() {
    this.tiles.forEach((tile) => {
      tile.updatePosition(tile.x, tile.y + 1);
    });
    for (let i = 0; i < this.options.rows; i++) {
      const prob = Math.random();
      let size;
      if (prob > 0.95) {
        size = 3;
      } else if (prob > 0.8) {
        size = 2;
      } else if (prob > 0.5) {
        size = 1;
      } else {
        size = 0;
      }
      const otherTile = this.tiles.find(
        (tile) => tile.y === 0 && tile.x + tile.width - 1 >= i
      );
      if (!otherTile && size > 0) {
        const tile = new Tile(size, 1, i, 0, "#fff", i);
        this.board.appendChild(tile.domElement);
        this.tiles.push(tile);
      }
    }
  }

  bringDown() {
    let finished = false;
    while (!finished) {
      finished = true;
      this.tiles.forEach((tile) => {
        const otherTile = this.tiles.find(
          (t) =>
            t.y === tile.y - 1 &&
            ((t.x <= tile.x + tile.width - 1 && t.x >= tile.x) ||
              (t.x + t.width - 1 <= tile.x + tile.width - 1 &&
                t.x + t.width - 1 >= tile.x))
        );
        if (!otherTile && tile.y > 0) {
          tile.updatePosition(tile.x, tile.y - 1);
          finished = false;
        }
      });
    }
  }
}

const game = new FallingPuzzle(document.getElementById("pieces"), {
  rows: 10,
  cols: 10,
});

game.addRow();
game.addRow();
game.addRow();
