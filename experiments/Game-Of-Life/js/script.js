// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

let offSetLeft; let offSetTop; let width; let height; let size; let
  game;
const mPos = { x: 0, y: 0 };
const cursor = { x: -1, y: -1 };
let running = false;
const dots = 30;
const fps = 30;
let iWantToDraw = true;
const bgColor = '#ffffff';
const tileColor = '#000000';

const fpsInput = document.getElementById('fpsInput');
const sizeInput = document.getElementById('sizeInput');
const bgColorInput = document.getElementById('bgColorInput');
const tileColorInput = document.getElementById('tileColorInput');

const drawButton = document.getElementById('draw');
const eraseButton = document.getElementById('erase');

const playPauseButton = document.getElementById('playPauseButton');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas_container = document.getElementById('canvas_container');

const playPause = () => {
  running ? pause() : play();
};

const play = () => {
  running = true;
  game.setRunningState(running);
};

const pause = () => {
  running = false;
  game.setRunningState(running);
};

const resetCanvas = () => {
  const cw = document.body.clientWidth;
  const ch = document.body.clientHeight;
  let canvasSize = (cw < ch ? cw : ch) * 0.9;
  if (canvasSize > ch - 150) canvasSize -= (canvasSize - (ch - 150));
  width = canvas.width = canvasSize;
  height = canvas.height = canvasSize;
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  size = canvasSize / dots;
};

const reset = () => {
  game = new Game(dots, dots);
  resetCanvas();
};
reset();

window.addEventListener('resize', () => { resetCanvas(); });
document.oncontextmenu = () => false;

// --------------------------------------------------------------------

// Mouse

canvas.addEventListener('mousedown', (e) => { draw(e, false); });
canvas.addEventListener('mouseenter', (e) => { draw(e, false); });
canvas.addEventListener('mousemove', (e) => { draw(e, false); setCursor(e); });

// Touch Display

canvas.addEventListener('touchstart', (e) => { draw(e, true); });
canvas.addEventListener('touchmove', (e) => draw(e, true));

const setToDraw = () => {
  iWantToDraw = true;
  drawButton.classList.add('selected');
  eraseButton.classList.remove('selected');
};

const setToErase = () => {
  iWantToDraw = false;
  drawButton.classList.remove('selected');
  eraseButton.classList.add('selected');
};

const setPosition = (e) => {
  mPos.x = e.clientX;
  mPos.y = e.clientY;
};

const setPositionTouch = (e) => {
  mPos.x = e.touches[0].clientX;
  mPos.y = e.touches[0].clientY;
};

const setCursor = (e) => {
  cursor.x = Math.floor(((e.clientX - offSetLeft) * dots) / width);
  cursor.y = Math.floor(((e.clientY - offSetTop) * dots) / height);
};

const resetCursor = () => {
  cursor.x = -1;
  cursor.y = -1;
};

const draw = (e, touch) => {
  if (!touch && (e.buttons !== 1) && (e.buttons !== 2)) return;
  pause();
  touch ? setPositionTouch(e) : setPosition(e);
  const x = Math.floor(((mPos.x - offSetLeft) * dots) / width);
  const y = Math.floor(((mPos.y - offSetTop) * dots) / height);

  if (touch) {
    game.setValueOf(x, y, iWantToDraw);
  } else if (!touch) {
    if (e.buttons == 1 && iWantToDraw) game.setValueOf(x, y, true);
    else if ((e.buttons == 1 && !iWantToDraw) || e.buttons == 2) game.setValueOf(x, y, false);
  }

  resetCursor();
};

const drawCursor = () => {
  ctx.save();
  ctx.fillStyle = 'rgba(189, 142, 183, .5)';
  ctx.roundRect(cursor.x * size, cursor.y * size, size - 1, size - 1, 3).fill();
  ctx.restore();
};

const drawMatrix = (matrix) => {
  ctx.fillStyle = tileColor;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        ctx.roundRect(j * size, i * size, size - 1, size - 1, 3).fill();
      }
    }
  }
};

const clearCanvas = () => {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
};

// --------------------------------------------------------------------

const loop = () => {
  setTimeout(() => {
    loop();
    game.step();
  }, 1000 / fps);
};

const drawLoop = () => {
  requestAnimationFrame(drawLoop);
  clearCanvas();
  drawCursor();
  drawMatrix(game.currentState());
};

loop();
drawLoop();

// --------------------------------------------------------------------
