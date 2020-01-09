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

// ----------------------------------------------------------------- //

const starInput = document.getElementById('star-input');
const wipInput = document.getElementById('wip-input');
const othersInput = document.getElementById('others-input');

const stars = document.getElementsByClassName('star-link');
const wips = document.getElementsByClassName('wip-link');
const others = document.getElementsByClassName('others-link');

const updateCategories = () => {
  for (let star of stars) star.classList.add('d-none');
  for (let wip of wips) wip.classList.add('d-none');
  for (let other of others) other.classList.add('d-none');

  if (starInput.checked) for (let star of stars) star.classList.remove('d-none');
  if (wipInput.checked) for (let wip of wips) wip.classList.remove('d-none');
  if (othersInput.checked) for (let other of others) other.classList.remove('d-none');
}
