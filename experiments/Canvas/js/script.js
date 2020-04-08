// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', () => {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

// --------------------------------------------------------------------

let penDown = false;

// Mouse

canvas.addEventListener('mousedown', () => penDown = true);
canvas.addEventListener('mouseup', () => penDown = false);
canvas.addEventListener('mouseout', () => penDown = false);
canvas.addEventListener('mousemove', (evt) => {
  if (penDown) {
    const mouseX = evt.clientX - offSetLeft;
    const mouseY = evt.clientY - offSetTop;
    const point = new Point(mouseX, mouseY);
    drawing.addPoint(point);
    drawing.sort();
  }
});

// Touch Display

canvas.addEventListener('touchstart', () => penDown = true);
canvas.addEventListener('touchcancel', () => penDown = false);
canvas.addEventListener('touchend', () => penDown = false);
canvas.addEventListener('touchmove', (evt) => {
  if (penDown) {
    const mouseX = evt.touches[0].clientX - offSetLeft;
    const mouseY = evt.touches[0].clientY - offSetTop;
    const point = new Point(mouseX, mouseY);
    drawing.addPoint(point);
    drawing.sort();
  }
});

let drawing = new Drawing();

function reset() {
  drawing = new Drawing();
}

function loop() {
  requestAnimationFrame(loop);
  drawing.step();
  drawing.draw();
}

loop();
