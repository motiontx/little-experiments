// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

window.addEventListener('resize', () => {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;
});

// --------------------------------------------------------------------
