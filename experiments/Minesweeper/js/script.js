const config = document.getElementById('config');
let settings = false;
function configOpenClose(){
  config.style.top = settings ? '-200px' : '0';
  settings = !settings;
}

let game = new Minesweeper(5, 5, 2);

function reset(){
  game.reset();
}
