const keys = {};

for (let key of Object.keys(notes)) {
  keys[key] = document.getElementById(key);
}

function pressKey(key) {
  keys[key].classList.add("pressed");
  setTimeout(() => {keys[key].classList.remove("pressed")}, 150);
}

/*-----------------------------------------------------------*/

const ctx = new AudioContext();

function playSound(frequency, waveType) {
  let wave = waveType || document.querySelector('input[name="wave"]:checked').value;

  let osc = ctx.createOscillator();
  let gain = ctx.createGain();

  osc.type = wave;
  osc.frequency.value = frequency;
  osc.connect(gain);

  let releaseValue = ctx.currentTime + 2;
  gain.gain.value = 0.3;
  gain.gain.exponentialRampToValueAtTime(0.00001, releaseValue);
  gain.connect(ctx.destination);

  osc.start(0);
  osc.stop(releaseValue);
}

/*-----------------------------------------------------------*/

const key_names = document.getElementsByClassName('key-name');
const key_numbers = document.getElementsByClassName('key-number');
const help = document.getElementById('help')

function showHelp() {
  let display = help.checked ? "block" : "none";
  for (let el of key_names) {
    el.style.display = display;
  }
  for (let el of key_numbers) {
    el.style.display = display;
  }
}

/*-----------------------------------------------------------*/

const lengthSong = song.length;
let playing = false;
let step = 0;

function playSample() {
  if (playing) {
    if (song[step][0] != "Blank") {
      playSound(notes[song[step][0]]);
      pressKey(song[step][0]);
    }
    setTimeout(playSample, song[step][1] * 0.8);
    step++;
    if (step == lengthSong) {
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
