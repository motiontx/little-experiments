// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

let offSetLeft, offSetTop, width, height, size;
let mPos = {x:0, y:0};
let running = false;
let dots = 100;
let game = new Game(dots, dots);


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

function resetCanvas(){
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
  size = width / dots;
}
resetCanvas();

window.addEventListener('resize', function() {resetCanvas()});

// --------------------------------------------------------------------

// Mouse

canvas.addEventListener('mousedown', (e) => {draw(e, false)});
canvas.addEventListener('mouseenter', (e) => {draw(e, false)});
canvas.addEventListener("mousemove", (e) => draw(e, false));

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

function draw(e, touch) {
  if(!touch && (e.buttons !== 1)) return;
  pause();
  touch ? setPositionTouch(e) : setPosition(e);
  let x = Math.floor(((mPos.x - offSetLeft) * dots) / width);
  let y = Math.floor(((mPos.y - offSetTop) * dots) / height);
  game.setValueOf(x,y,true);
}

function drawMatrix(matrix) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        ctx.roundRect(j * size, i * size, size - 1, size - 1, 5).fill();
      }
    }
  }
}

// --------------------------------------------------------------------

function loop() {
  requestAnimationFrame(loop);
  drawMatrix(game.currentState());
  game.step();
}

loop();

// --------------------------------------------------------------------
