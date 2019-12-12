// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const home = document.getElementById('home');
const display = document.getElementById('display');
const frame = document.getElementById('frame');

const backToHome = () => {
  home.style.display = "flex";
  display.style.display = "none";
  frame.src = "";
}

const setExperiment = (name) => {
  display.style.display = "block";
  home.style.display = "none";
  frame.src = `./experiments/${name}/index.html`;
}
