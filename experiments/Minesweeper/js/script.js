document.getElementById('height_pre').innerHTML = twemoji.parse('↕️');
document.getElementById('width_pre').innerHTML = twemoji.parse('↔️');
document.getElementById('bomb_pre').innerHTML = twemoji.parse('💣');

document.addEventListener('contextmenu', (e) => e.preventDefault());

const width_input = document.getElementById('width_input');
const height_input = document.getElementById('height_input');
const bombs_input = document.getElementById('bombs_input');

const config = document.getElementById('config');
let settings = false;

function configOpenClose() {
  config.style.top = settings ? '-250px' : '0';
  settings = !settings;
}

let game = new Minesweeper(15, 15, 20);

function reset() {
  game.reset();
}

function saveAndRestart() {
  let width = width_input.value;
  let height = height_input.value;
  let bombs = bombs_input.value;

  if (width > 50 || height > 50) {
    alert("Max width: 50 | Max height: 50");
  } else if (bombs > width * height) {
    alert("More bombs than cells!");
  } else {
    game = new Minesweeper(width, height, bombs);
    configOpenClose()
  }
}
