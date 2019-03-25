const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById("canvas_container");

let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

// --------------------------------------------------------------------

let DefaultPos = {x:0, y:0};

// Mouse

document.addEventListener('mousedown', (e) => {setPosition(e); draw(e, false)});
document.addEventListener('mouseenter', (e) => {setPosition(e); draw(e, false)});
document.addEventListener("mousemove", (e) => draw(e, false));

// Touch Display

document.addEventListener('touchstart', (e) => {setPositionTouch(e); draw(e, true)});
document.addEventListener('touchmove', (e) => draw(e, true));

function setPosition(e){
	DefaultPos.x = e.clientX;
	DefaultPos.y = e.clientY;
}

function setPositionTouch(e){
	DefaultPos.x = e.touches[0].clientX;
	DefaultPos.y = e.touches[0].clientY;
}

function draw(e, touch){

  if(!touch && (e.buttons !== 1)) return;

	ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = "black";

  ctx.moveTo(DefaultPos.x, DefaultPos.y);

  touch ? setPositionTouch(e) : setPosition(e);

  ctx.lineTo(DefaultPos.x, DefaultPos.y);

  ctx.stroke();
}
