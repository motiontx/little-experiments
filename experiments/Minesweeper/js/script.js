// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

document.addEventListener('contextmenu', (e) => e.preventDefault());

const widthInput = document.getElementById('width_input');
const heightInput = document.getElementById('height_input');
const bombsInput = document.getElementById('bombs_input');
const emojiset = document.getElementById('emojiset');

const config = document.getElementById('config');
let settings = false;

function configOpenClose() {
  config.style.top = settings ? '-250px' : '0';
  settings = !settings;
}

const game = new Minesweeper(10, 10, 10);

function reset() {
  game.reset();
}

function saveAndRestart() {
  const width = widthInput.value;
  const height = heightInput.value;
  const bombs = bombsInput.value;
  const twemoji = emojiset.value === 'twemoji';

  if (width > 50 || height > 50) {
    alert('Max width: 50 | Max height: 50');
  } else if (bombs > width * height) {
    alert('More bombs than cells!');
  } else {
    game.reset(width, height, bombs, twemoji);
    configOpenClose();
  }
}
