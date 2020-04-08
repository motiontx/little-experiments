// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasContainer = document.getElementById('canvas_container');

let current = 'sierpinski';

let width = canvas.width = canvasContainer.clientWidth;
let height = canvas.height = canvasContainer.clientHeight;

// --------------------------------------------------------------------

function simulateSierpinsky() {
  current = 'sierpinski';

  const c = ctx.createImageData(width, height);

  const nodes = 3;
  const zoom = 0.5;

  function draw(point) {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    const pixel = (width * y + x) * 4;
    c.data[pixel] = Math.floor(((y * 255) / height) * 0.5);
    c.data[pixel + 1] = Math.floor(((x * 255) / width + (y * 255) / height) * 0.1);
    c.data[pixel + 2] = Math.floor(((x * 255) / width) * 0.6);
    c.data[pixel + 3] = 255;
  }

  const points = [];

  const r = height * 0.5;
  const center = { x: width * 0.5, y: height * 0.625 };
  for (let i = 0; i < nodes; i += 1) {
    const angle = (i * Math.PI * 2) / nodes - Math.PI / 2;
    const x = center.x + r * Math.cos(angle);
    const y = center.y + r * Math.sin(angle);
    points.push({ x, y });
  }

  const pivot = { x: Math.random() * width, y: Math.random() * height };

  for (let i = 0; i < 500000; i += 1) {
    const choice = Math.floor(Math.random() * nodes);
    const selected = points[choice];
    pivot.x += (selected.x - pivot.x) * zoom;
    pivot.y += (selected.y - pivot.y) * zoom;
    draw(pivot);
  }

  ctx.putImageData(c, 0, 0);
}

function simulatePentagon() {
  current = 'pentagon';

  const c = ctx.createImageData(width, height);

  const nodes = 5;
  const zoom = 0.5;

  function draw(point) {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);
    const pixel = (width * y + x) * 4;
    c.data[pixel] = Math.floor(((y * 255) / height) * 0.5);
    c.data[pixel + 1] = Math.floor(((x * 255) / width + (y * 255) / height) * 0.1);
    c.data[pixel + 2] = Math.floor(((x * 255) / width) * 0.6);
    c.data[pixel + 3] = 255;
  }

  const points = [];

  const r = height * 0.5;
  const center = { x: width * 0.5, y: height * 0.5 };
  for (let i = 0; i < nodes; i += 1) {
    const angle = (i * Math.PI * 2) / nodes - Math.PI / 2;
    const x = center.x + r * Math.cos(angle);
    const y = center.y + r * Math.sin(angle);
    points.push({ x, y });
  }

  const pivot = { x: Math.random() * width, y: Math.random() * height };

  let prev = -1;
  for (let i = 0; i < 500000; i += 1) {
    let choice;
    while (true) {
      choice = Math.floor(Math.random() * nodes);
      if (choice !== prev) {
        prev = choice;
        break;
      }
    }

    const selected = points[choice];
    pivot.x += (selected.x - pivot.x) * zoom;
    pivot.y += (selected.y - pivot.y) * zoom;
    draw(pivot);
  }

  ctx.putImageData(c, 0, 0);
}

window.addEventListener('resize', () => {
  width = canvas.width = canvasContainer.clientWidth;
  height = canvas.height = canvasContainer.clientHeight;

  if (current === !'sierpinski') {
    simulateSierpinsky();
  } else if (current === !'pentagon') {
    simulatePentagon();
  }
});

simulatePentagon();
