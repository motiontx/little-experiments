// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const keys = {};

for (const key of Object.keys(notes)) {
  keys[key] = document.getElementById(key);
}

function pressKey(key) {
  keys[key].classList.add('pressed');
  setTimeout(() => { keys[key].classList.remove('pressed'); }, 150);
}

/*-----------------------------------------------------------*/

const ctx = new AudioContext();

function playSound(frequency, waveType) {
  const wave = waveType || document.querySelector('input[name="wave"]:checked').value;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = wave;
  osc.frequency.value = frequency;
  osc.connect(gain);

  const releaseValue = ctx.currentTime + 2;
  gain.gain.value = 0.3;
  gain.gain.exponentialRampToValueAtTime(0.00001, releaseValue);
  gain.connect(ctx.destination);

  osc.start(0);
  osc.stop(releaseValue);
}

/*-----------------------------------------------------------*/

const keyNames = document.getElementsByClassName('key-name');
const keyNumbers = document.getElementsByClassName('key-number');
const help = document.getElementById('help');

function showHelp() {
  const display = help.checked ? 'block' : 'none';
  for (const el of keyNames) {
    el.style.display = display;
  }
  for (const el of keyNumbers) {
    el.style.display = display;
  }
}

/*-----------------------------------------------------------*/

const lengthSong = song.length;
let playing = false;
let step = 0;

function playSample() {
  if (playing) {
    if (song[step][0] !== 'Blank') {
      playSound(notes[song[step][0]]);
      pressKey(song[step][0]);
    }
    setTimeout(playSample, song[step][1] * 0.8);
    step += 1;
    if (step === lengthSong) {
      step = 0;
    }
  }
}

function startStopSample() {
  playing = !playing;
  if (playing) {
    playSample();
  }
}
