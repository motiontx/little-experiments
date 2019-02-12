const config = document.getElementById('config');

const grid = document.getElementById('grid');

const openConfig = () => config.style.top = '0';
const closeConfig = () => config.style.top = '-150px';

let game = new Minesweeper(10,10);
