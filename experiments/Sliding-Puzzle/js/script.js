// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const crop = (canvas, offsetX, offsetY, width, height) => {
  const buffer = document.createElement('canvas');
  const bCtx = buffer.getContext('2d');
  buffer.width = width;
  buffer.height = height;
  bCtx.drawImage(canvas, offsetX, offsetY, width, height, 0, 0, buffer.width, buffer.height);
  return buffer.toDataURL();
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// ----------------------------------------------------------------- //

class Game {
  constructor() {
    this.size = 5;
    this.pieceLength;
    this.movements = 0;
    this.time;
    this.timerActive = false;
    this.playing = false;
    this.shuffled = false;
    this.matrix = [];
    this.boardPieces;
    this.image = new Image();
    this.image.src = 'assets/photo.jpg';

    this.image.onload = () => {
      this.showPhoto();
    };

    this.board = document.getElementById('pieces');

    this.boardMovements = document.getElementById('movements');
    this.boardTimer = document.getElementById('timer');

    this.winMovements = document.getElementById('winMovements');
    this.winTime = document.getElementById('winTime');

    this.winScreen = document.getElementById('winScreen');

    this.photoCheckbox = document.getElementById('photoCheckbox');

    this.imageInput = document.getElementById('imageInput');
    this.imageInput.addEventListener('change', (el) => {
      this.uploadPhoto(el);
    });
    document.getElementById('imageInputButton').addEventListener('click', () => {
      this.imageInput.click();
    });
    this.photoCheckbox.addEventListener('click', (el) => {
      if (el.target.checked) {
        this.showPhoto();
      } else {
        this.hidePhoto();
      }
    });

    this.difficultyInput = document.getElementById('difficultyInput');
    this.difficultyInput.addEventListener('change', (el) => {
      this.updateDifficulty(el.target.value);
    });

    document.getElementById('reset').addEventListener('click', () => {
      this.reset();
    });

    document.getElementById('shuffle').addEventListener('click', () => {
      this.shuffle();
    });

    document.getElementById('closeWinScreen').addEventListener('click', () => {
      this.closeWinScreen();
    });

    document.getElementById('winShuffle').addEventListener('click', () => {
      this.closeWinScreen();
      this.shuffle();
    });

    this.reset();
  }

  reset() {
    this.pieceLength = 100 / this.size;
    this.playing = false;
    this.shuffled = false;
    this.timerActive = false;
    this.resetTimer();
    this.resetMovements();

    this.resetMatrix();
    this.resetBoard();

    if (this.photoCheckbox.checked) {
      this.showPhoto();
    }
  }

  // Win Screen ------------------------------------------------------ //

  openWinScreen() {
    this.winScreen.classList.remove('d-none');
  }

  closeWinScreen() {
    this.winScreen.classList.add('d-none');
  }

  updateWinScreen() {
    this.winMovements.innerHTML = this.movements;
    this.winTime.innerHTML = this.time;
  }

  // Difficulty ------------------------------------------------------ //

  updateDifficulty(size) {
    this.size = size;
    this.reset();
  }

  // Shuffle --------------------------------------------------------- //

  shuffle() {
    if (!this.shuffled) {
      let pivot = {
        x: this.size - 1,
        y: this.size - 1,
      };
      for (let i = 0; i < 999; i += 1) {
        const next = this.neighbors(pivot.x, pivot.y).random();
        this.matrix[pivot.y][pivot.x] = this.matrix[next.y][next.x];
        pivot = next;
      }
      this.matrix[pivot.y][pivot.x] = -1;

      for (let i = 0; i < this.matrix.length; i += 1) {
        for (let j = 0; j < this.matrix[i].length; j += 1) {
          const number = this.matrix[i][j];
          if (number !== -1) {
            const x = ((number - 1) % this.size);
            const y = Math.floor((number - x) / this.size);
            this.updatePiecePosition(this.boardPieces[y][x], j, i);
          }
        }
      }

      this.shuffled = true;
    }
    this.startPlaying();
  }

  // Numbers --------------------------------------------------------- //

  showBoardPiecesNumbers() {
    for (const row of this.boardPieces) {
      for (const div of row) {
        div.firstChild.classList.remove('d-none');
      }
    }
  }

  hideBoardPiecesNumbers() {
    for (const row of this.boardPieces) {
      for (const div of row) {
        div.firstChild.classList.add('d-none');
      }
    }
  }

  // Photo ----------------------------------------------------------- //

  uploadPhoto(e) {
    const { files } = e.target; // FileList object
    const file = files[0];
    if (file.type.match('image.*')) {
      const game = this;
      const reader = new FileReader();
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (e.target.readyState == FileReader.DONE) {
          game.image.src = e.target.result;
        }
      };
    } else {
      alert('Not an image');
    }
  }

  showPhoto() {
    this.hideBoardPiecesNumbers();
    let size = this.image.width < this.image.height ? this.image.width : this.image.height;
    size = Math.floor(size / this.size);
    for (let i = 0; i < this.boardPieces.length; i += 1) {
      for (let j = 0; j < this.boardPieces[i].length; j += 1) {
        const div = this.boardPieces[i][j];
        div.style.backgroundImage = `url(${crop(this.image, j * size, i * size, size, size)})`;
      }
    }
    this.photoCheckbox.checked = true;
  }

  hidePhoto() {
    this.showBoardPiecesNumbers();
    for (let i = 0; i < this.boardPieces.length; i += 1) {
      for (let j = 0; j < this.boardPieces[i].length; j += 1) {
        const div = this.boardPieces[i][j];
        div.style.backgroundImage = '';
      }
    }
    this.photoCheckbox.checked = false;
  }

  // Timer ----------------------------------------------------------- //

  startTimer() {
    this.time = '0.00';
    this.startTime = new Date();
    this.timer = setInterval(() => {
      this.time = ((new Date() - this.startTime) / 1000).toFixed(2);
      this.boardTimer.innerHTML = this.time;
    }, 100);
    this.timerActive = true;
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = false;
    this.boardTimer.innerHTML = '0.00';
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = false;
  }

  // Movements ------------------------------------------------------- //

  resetMovements() {
    this.movements = 0;
    this.updateBoardMovements();
  }

  updateBoardMovements() {
    this.boardMovements.innerHTML = this.movements;
  }

  // Others ---------------------------------------------------------- //

  resetMatrix() {
    const matrix = [];
    for (let i = 0; i < this.size; i += 1) {
      const row = [];
      for (let j = 0; j < this.size; j += 1) {
        row.push(j + (i * this.size) + 1);
      }
      matrix.push(row);
    }
    matrix[this.size - 1][this.size - 1] = -1;
    this.matrix = matrix;
  }

  resetBoard() {
    this.board.innerHTML = '';
    this.boardPieces = [];
    for (let i = 0; i < this.matrix.length; i += 1) {
      const row = [];

      for (let j = 0; j < this.matrix[i].length; j += 1) {
        const number = this.matrix[i][j];

        if (number !== -1) {
          const div = document.createElement('div');

          const p = document.createElement('p');
          p.className = 'number';
          p.innerHTML = number;
          p.onclick = function () {
            this.parentNode.click();
          };
          div.appendChild(p);

          div.className = 'piece';
          div.style.width = div.style.height = `${this.pieceLength}%`;
          this.updatePiecePosition(div, j, i);

          div.addEventListener('click', (el) => {
            this.movePiece(el.target);
          });

          row.push(div);
          this.board.appendChild(div);
        }
      }

      this.boardPieces.push(row);
    }

    this.updateBoardMovements();
  }

  movePiece(piece) {
    if (this.playing) {
      if (!this.timerActive) {
        this.startTimer();
      }

      const x = parseInt(piece.getAttribute('x'));
      const y = parseInt(piece.getAttribute('y'));
      const newPos = this.neighborIsEmpty(x, y);

      if (newPos) {
        const n = this.matrix[y][x];
        this.matrix[newPos.y][newPos.x] = n;
        this.matrix[y][x] = -1;
        this.updatePiecePosition(piece, newPos.x, newPos.y);

        this.movements++;
        this.updateBoardMovements();

        if (this.checkIfIWin()) {
          this.gameWon();
        }
      }
    }
  }

  updatePiecePosition(piece, x, y) {
    piece.setAttribute('x', x);
    piece.setAttribute('y', y);
    piece.style.top = `${y * this.pieceLength}%`;
    piece.style.left = `${x * this.pieceLength}%`;
  }

  neighborIsEmpty(x, y) {
    if (y - 1 >= 0 && this.matrix[y - 1][x] === -1) {
      return {
        x,
        y: y - 1,
      };
    }
    if (x + 1 < this.size && this.matrix[y][x + 1] === -1) {
      return {
        x: x + 1,
        y,
      };
    }
    if (y + 1 < this.size && this.matrix[y + 1][x] === -1) {
      return {
        x,
        y: y + 1,
      };
    }
    if (x - 1 >= 0 && this.matrix[y][x - 1] === -1) {
      return {
        x: x - 1,
        y,
      };
    }
    return false;
  }

  neighbors(x, y) {
    const neighbors = [];
    if (y - 1 >= 0) {
      neighbors.push({
        x,
        y: y - 1,
      });
    }
    if (x + 1 < this.size) {
      neighbors.push({
        x: x + 1,
        y,
      });
    }
    if (y + 1 < this.size) {
      neighbors.push({
        x,
        y: y + 1,
      });
    }
    if (x - 1 >= 0) {
      neighbors.push({
        x: x - 1,
        y,
      });
    }
    return neighbors;
  }

  startPlaying() {
    this.resetTimer();
    this.resetMovements();
    this.playing = true;
  }

  checkIfIWin() {
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        if (i === this.size - 1 && j === this.size - 1) {
          if (this.matrix[i][j] !== -1) {
            return false;
          }
        } else if (this.matrix[i][j] !== j + (i * this.size) + 1) {
          return false;
        }
      }
    }
    return true;
  }

  gameWon() {
    this.pauseTimer();
    this.playing = false;
    this.updateWinScreen();
    this.openWinScreen();
    this.reset();
  }
}

window.onload = () => {
  const game = new Game();
};
