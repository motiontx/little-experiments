// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

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

  simulate();

});

// --------------------------------------------------------------------

function simulate(){

  let image = ctx.createImageData(width, height);

  let x = 1;
  let y = 1;
  let z = 1;

  let a = 10;
  let b = 28;
  let c = 8/3;

  let precision = 0.0001;

  let dx;
  let dy;
  let dz;

  for (let i = 0; i < 1000000; i++) {

    dx = ( a * ( y - x ) ) * precision;
    dy = ( x * ( b - z ) - y) * precision;
    dz = ( x * y - c * z ) * precision;

    x += dx;
    y += dy;
    z += dz;

    let xPos = Math.floor(x * height * 0.02 + width * 0.5);
    let yPos = Math.floor(height * 0.5 - y * height * 0.02);
    let pixel = (width * yPos + xPos) * 4;
    image.data[pixel] = Math.floor(((yPos*255)/height)*0.5)
    image.data[pixel+1] = Math.floor(((xPos*255)/width + (yPos*255)/height)*0.1)
    image.data[pixel+2] = Math.floor(((xPos*255)/width)*0.6)
    image.data[pixel+3] = 255;

  }

  ctx.putImageData(image, 0, 0)

}

simulate();
