// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

// --------------------------------------------------------------------

function simulate() {
  const image = ctx.createImageData(width, height);

  let x = 1;
  let y = 1;
  let z = 1;

  const a = 10;
  const b = 28;
  const c = 8 / 3;

  const precision = 0.0001;

  let dx;
  let dy;
  let dz;

  for (let i = 0; i < 1000000; i += 1) {
    dx = (a * (y - x)) * precision;
    dy = (x * (b - z) - y) * precision;
    dz = (x * y - c * z) * precision;

    x += dx;
    y += dy;
    z += dz;

    const xPos = Math.floor(x * height * 0.02 + width * 0.5);
    const yPos = Math.floor(height * 0.5 - y * height * 0.02);
    const pixel = (width * yPos + xPos) * 4;
    image.data[pixel] = Math.floor(((yPos * 255) / height) * 0.5);
    image.data[pixel + 1] = Math.floor(((xPos * 255) / width + (yPos * 255) / height) * 0.1);
    image.data[pixel + 2] = Math.floor(((xPos * 255) / width) * 0.6);
    image.data[pixel + 3] = 255;
  }

  ctx.putImageData(image, 0, 0);
}

window.addEventListener('resize', () => {
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;
  simulate();
});

simulate();
