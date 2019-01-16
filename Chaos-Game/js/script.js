const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_container = document.getElementById("canvas_container");

var offSetLeft = canvas.offsetLeft;
var offSetTop = canvas.offsetTop;
var width = canvas.width = canvas_container.clientWidth;
var height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;

  switch (current) {
    case "sierpinski": simulateSierpinsky(); break;
    case "pentagon": simulatePentagon(); break;
  }

});

// --------------------------------------------------------------------

var current = "sierpinski";

function simulateSierpinsky(){

  current = "sierpinski";

  var c = ctx.createImageData(width, height);

  let nodes = 3;
  let zoom = 0.5;

  function draw(point){
    let x = Math.floor(point.x);
    let y = Math.floor(point.y);
    let pixel = (width*y+x)*4;
    c.data[pixel] = Math.floor(((y*255)/height)*0.5)
    c.data[pixel+1] = Math.floor(((x*255)/width + (y*255)/height)*0.1)
    c.data[pixel+2] = Math.floor(((x*255)/width)*0.6)
    c.data[pixel+3] = 255;
  }

  let points = [];

  let r = height*0.5;
  let center = {x: width * 0.5, y: height * 0.625}
  for (var i = 0; i < nodes; i++) {
    let angle = i * Math.PI*2 / nodes -  Math.PI/2;
    let x = center.x + r * Math.cos(angle);
    let y = center.y + r * Math.sin(angle);
    points.push({x: x, y: y});
  }

  pivot = {x:Math.random()*width, y: Math.random()*height};

  for (var i = 0; i < 500000; i++) {
    let choice = Math.floor(Math.random() * nodes) ;
    let selected = points[choice];
    pivot.x = pivot.x + (selected.x-pivot.x) * zoom;
    pivot.y = pivot.y + (selected.y-pivot.y) * zoom;
    draw(pivot);
  }

  ctx.putImageData(c, 0, 0)

}

function simulatePentagon(){

  current = "pentagon";

  var c = ctx.createImageData(width, height);

  let nodes = 5;
  let zoom = 0.5;

  function draw(point){
    let x = Math.floor(point.x);
    let y = Math.floor(point.y);
    let pixel = (width*y+x)*4;
    c.data[pixel] = Math.floor(((y*255)/height)*0.5)
    c.data[pixel+1] = Math.floor(((x*255)/width + (y*255)/height)*0.1)
    c.data[pixel+2] = Math.floor(((x*255)/width)*0.6)
    c.data[pixel+3] = 255;
  }

  let points = [];

  let r = height*0.5;
  let center = {x: width * 0.5, y: height * 0.5}
  for (var i = 0; i < nodes; i++) {
    let angle = i * Math.PI*2 / nodes -  Math.PI/2;
    let x = center.x + r * Math.cos(angle);
    let y = center.y + r * Math.sin(angle);
    points.push({x: x, y: y});
  }

  pivot = {x:Math.random()*width, y: Math.random()*height};

  var prev = -1;
  for (var i = 0; i < 500000; i++) {
    let choice;
    while (true) {
      choice = Math.floor(Math.random() * nodes) ;
      if (choice != prev) {
        prev = choice;
        break;
      }
    }

    let selected = points[choice];
    pivot.x = pivot.x + (selected.x-pivot.x) * zoom;
    pivot.y = pivot.y + (selected.y-pivot.y) * zoom;
    draw(pivot);
  }

  ctx.putImageData(c, 0, 0)

}

simulatePentagon();
