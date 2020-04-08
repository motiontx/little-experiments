// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

// --------------------------------------------------------------------

Math.radians = (degrees) => (degrees * Math.PI) / 180;

function generate(angle, cValue) {
  ctx.translate(width / 2, height / 2);

  const a = Math.radians(angle);
  let r = 0;
  const c = cValue;

  for (let n = 0; n < 4000; n += 1) {
    const x = r * Math.cos(a * n);
    const y = r * Math.sin(a * n);

    ctx.beginPath();
    ctx.fillStyle = `rgb(${(a * r) % 255},${(a * n) % 255},${(r * n) % 255})`;
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();

    r = c * Math.sqrt(n);
  }
}

window.addEventListener('resize', () => {
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;
  generate(137.5, 6);
});

generate(137.5, 6);
