const config = document.getElementById('config');
let settings = false;
function configOpenClose(){
  config.style.top = settings ? '-200px' : '0';
  settings = !settings;
}

let game = new Minesweeper(10,10);

function reset(){
  game.reset();
}
