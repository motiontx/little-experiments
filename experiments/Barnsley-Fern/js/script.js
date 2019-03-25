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

  let c = ctx.createImageData(width, height);

  let pX = 0;
  let pY = 0;

  for (let i = 0; i < 500000; i++) {

    let choice = Math.random();
    let x = pX;
    let y = pY;

    if (choice < 0.01) { pX = 0; pY = 0.16*y;}
    else if (choice < 0.08) {
      pX = -0.15*x + 0.28*y;
      pY = 0.26*x + 0.24*y + 0.44;
    }else if (choice < 0.15) {
      pX =  0.2*x - 0.26*y;
      pY = 0.23*x + 0.22*y + 1.6;
    }else{
      pX = 0.85*x + 0.04*y;
      pY = -0.04*x + 0.85*y +1.6;
    }

    let xPos = Math.floor(pX * height * 0.098 + width / 2);
    let yPos = Math.floor(height - pY * height * 0.098);
    let pixel = (width * yPos + xPos) * 4;
    c.data[pixel] = Math.floor(((xPos * 255) / width) * 0.2)
    c.data[pixel+1] = 255 - Math.floor(((yPos * 255) / height) * 0.8)
    c.data[pixel+2] = Math.floor(((xPos * 255) / width + (yPos * 255) / height) * 0.1)
    c.data[pixel+3] = 255;

  }

  ctx.putImageData(c, 0, 0)

}

simulate();
