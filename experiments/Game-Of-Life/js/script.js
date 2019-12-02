// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

let offSetLeft, offSetTop, width, height, size, game;
let mPos = {x:0, y:0};
let cursor = {x:-1, y:-1};
let running = false;
let dots = 40;


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas_container = document.getElementById("canvas_container");


function playPause() {
  running = !running
  game.setRunningState(running);
}

function pause(){
  running = false;
  game.setRunningState(running);
}

function reset(){
  game = new Game(dots, dots);
}
reset();

function resetCanvas(){
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
  size = width / dots;
}
resetCanvas();

window.addEventListener('resize', function() {resetCanvas()});
document.oncontextmenu = () => false;

// --------------------------------------------------------------------

// Mouse

canvas.addEventListener('mousedown', (e) => {draw(e, false)});
canvas.addEventListener('mouseenter', (e) => {draw(e, false)});
canvas.addEventListener("mousemove", (e) => {draw(e, false); setCursor(e)});

// Touch Display

canvas.addEventListener('touchstart', (e) => {draw(e, true)});
canvas.addEventListener('touchmove', (e) => draw(e, true));

function setPosition(e){
	mPos.x = e.clientX;
	mPos.y = e.clientY;
}

function setPositionTouch(e){
	mPos.x = e.touches[0].clientX;
	mPos.y = e.touches[0].clientY;
}

function setCursor(e){
  cursor.x = Math.floor(((e.clientX - offSetLeft) * dots) / width);
  cursor.y = Math.floor(((e.clientY - offSetTop) * dots) / height);
}

function draw(e, touch) {
  if(!touch && (e.buttons !== 1) && (e.buttons !== 2)) return;
  pause();
  touch ? setPositionTouch(e) : setPosition(e);
  let x = Math.floor(((mPos.x - offSetLeft) * dots) / width);
  let y = Math.floor(((mPos.y - offSetTop) * dots) / height);
  if (e.buttons == 1) {
    game.setValueOf(x,y,true);
  } else {
    game.setValueOf(x,y,false);
  }
}

function drawCursor(){
  ctx.save();
  ctx.fillStyle = "rgba(189, 142, 183, .5)";
  ctx.roundRect(cursor.x * size, cursor.y * size, size - 1, size - 1, 3).fill();
  ctx.restore();
}

function drawMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        ctx.roundRect(j * size, i * size, size - 1, size - 1, 3).fill();
      }
    }
  }
}

// --------------------------------------------------------------------

function loop() {
  requestAnimationFrame(loop);

  ctx.clearRect(0, 0, width, height);
  drawMatrix(game.currentState());
  drawCursor();

  game.step();
}

loop();

// --------------------------------------------------------------------
