// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

window.addEventListener('resize', () => {
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;

  simulate();
});

// --------------------------------------------------------------------

function simulate() {
  const c = ctx.createImageData(width, height);

  let pX = 0;
  let pY = 0;

  for (let i = 0; i < 500000; i += 1) {
    const choice = Math.random();
    const x = pX;
    const y = pY;

    if (choice < 0.01) { pX = 0; pY = 0.16 * y; } else if (choice < 0.08) {
      pX = -0.15 * x + 0.28 * y;
      pY = 0.26 * x + 0.24 * y + 0.44;
    } else if (choice < 0.15) {
      pX = 0.2 * x - 0.26 * y;
      pY = 0.23 * x + 0.22 * y + 1.6;
    } else {
      pX = 0.85 * x + 0.04 * y;
      pY = -0.04 * x + 0.85 * y + 1.6;
    }

    const xPos = Math.floor(pX * height * 0.098 + width / 2);
    const yPos = Math.floor(height - pY * height * 0.098);
    const pixel = (width * yPos + xPos) * 4;
    c.data[pixel] = Math.floor(((xPos * 255) / width) * 0.2);
    c.data[pixel + 1] = 255 - Math.floor(((yPos * 255) / height) * 0.8);
    c.data[pixel + 2] = Math.floor(((xPos * 255) / width + (yPos * 255) / height) * 0.1);
    c.data[pixel + 3] = 255;
  }

  ctx.putImageData(c, 0, 0);
}

simulate();
