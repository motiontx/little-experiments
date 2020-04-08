// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

// --------------------------------------------------------------------

function generate(size) {
  const xbars = width / size;
  const ybars = height / size;

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  for (let i = 0; i < ybars; i += 1) {
    for (let j = 0; j < xbars; j += 1) {
      const choice = Math.round(Math.random());
      ctx.beginPath();
      if (choice) {
        ctx.moveTo(j * size, i * size);
        ctx.lineTo(j * size + size, i * size + size);
      } else {
        ctx.moveTo(j * size, i * size + size);
        ctx.lineTo(j * size + size, i * size);
      }
      const rRand = Math.random() * 100 - 50;
      const gRand = Math.random() * 100 - 50;
      const bRand = Math.random() * 100 - 50;
      ctx.strokeStyle = `rgb(${((i * 255) / ybars) + rRand},${((j * 255) / xbars) + gRand},${((j * 255) / xbars) + bRand})`;
      ctx.stroke();
    }
  }
}

function regenerate() {
  generate(20);
}

window.addEventListener('resize', () => {
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;
  regenerate();
});

regenerate();
