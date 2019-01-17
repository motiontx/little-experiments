const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas_container = document.getElementById("canvas_container");

var offSetLeft = canvas.offsetLeft;
var offSetTop = canvas.offsetTop;
var width = canvas.width = canvas_container.clientWidth;
var height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

// --------------------------------------------------------------------
