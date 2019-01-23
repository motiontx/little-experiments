const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_container = document.getElementById("canvas_container");

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;

  generate(137.5,6);

});

// --------------------------------------------------------------------

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function generate(angle,cValue){

  ctx.translate(width/2,height/2);

  let a = Math.radians(angle);
  let r = 0;
  let c = cValue;

  for (let n = 0; n < 4000; n++) {

    let x = r * Math.cos(a*n);
    let y = r * Math.sin(a*n);

    ctx.beginPath();
    ctx.fillStyle = `rgb(${(a*r) % 255},${(a*n) % 255},${(r*n) % 255})`;
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();

    r = c * Math.sqrt(n);

  }

}

generate(137.5,6);
