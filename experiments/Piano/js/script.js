// --------------------------------------------------------------------

let ctx = new AudioContext();

function playSound(frequency) {

  let wave = document.querySelector('input[name="wave"]:checked').value;

  let osc = ctx.createOscillator();
  let gain = ctx.createGain();

  osc.type = wave;
  osc.frequency.value = frequency;
  osc.connect(gain);

  gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.5);
  gain.connect(ctx.destination);

  osc.start(0);
}
