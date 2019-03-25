const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById("canvas_container");

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;

  regenerate();
});

// --------------------------------------------------------------------

function generate(size) {

  let xbars = width / size;
  let ybars = height / size;

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  for (let i = 0; i < ybars; i++) {
    for (let j = 0; j < xbars; j++) {
      let choice = Math.round(Math.random());
      ctx.beginPath();
      if (choice) {
        ctx.moveTo(j * size, i * size);
        ctx.lineTo(j * size + size, i * size + size);
      } else {
        ctx.moveTo(j * size, i * size + size);
        ctx.lineTo(j * size + size, i * size);
      }
      let rRand = Math.random()*100-50;
      let gRand = Math.random()*100-50;
      let bRand = Math.random()*100-50;
      ctx.strokeStyle = `rgb(${(i*255/ybars) + rRand},${(j*255/xbars) + gRand},${(j*255/xbars) + bRand})`;
      ctx.stroke();
    }
  }
}

function regenerate() {
  generate(20);
}

regenerate();
