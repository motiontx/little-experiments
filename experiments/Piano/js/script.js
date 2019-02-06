
// --------------------------------------------------------------------

let ctx = new AudioContext();

let oscillator = ctx.createOscillator();

oscillator.connect(ctx.destination);



oscillator.type = 'triangle';
oscillator.detune.value = 6
oscillator.frequency.value = 5000;
oscillator.start(ctx.currentTime);
