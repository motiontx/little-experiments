const ctx = new AudioContext();

function playSound(frequency) {
  let wave = document.querySelector('input[name="wave"]:checked').value;

  let osc = ctx.createOscillator();
  let gain = ctx.createGain();

  osc.type = wave;
  osc.frequency.value = frequency;
  osc.connect(gain);

  let releaseValue = ctx.currentTime + 2;
  gain.gain.exponentialRampToValueAtTime(0.00001, releaseValue);
  gain.connect(ctx.destination);

  osc.start(0);
  osc.stop(releaseValue);
}

/*-----------------------------------------------------------*/

let key_names = document.getElementsByClassName('key-name');
let key_numbers = document.getElementsByClassName('key-number');

function showHelp() {
  let help = document.getElementById('help').checked;
  let display = help ? "block" : "none";
  for (let el of key_names) {
    el.style.display = display;
  }
  for (let el of key_numbers) {
    el.style.display = display;
  }
}

/*-----------------------------------------------------------*/

let playing = false;

let step = 0;
let longSong = song.length;

function playSample() {
  if (playing) {
    if (song[step][0] != "Blank") {
      playSound(notesName[song[step][0]]);
    }

    setTimeout(playSample, song[step][1] * 0.8);

    step++;
    if (step == longSong) {
      step = 0;
    }
  }
}

function startStopSample() {
  if (playing) {
    playing = false;
  } else {
    playing = true;
    playSample();
  }
}
