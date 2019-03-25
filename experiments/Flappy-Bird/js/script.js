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

  game.reset();
});

// --------------------------------------------------------------------

document.addEventListener('keydown', (evt) => {
  if (evt.which == 32) {
    {
      game.playing = true;
      game.addJump()
    };
  }
});

canvas.addEventListener('touchstart', () => {
  game.playing = true;
  game.addJump()
});

let game = new flappyBird();

function loop() {
  requestAnimationFrame(loop);
  game.step();
  game.draw();
}

loop();
