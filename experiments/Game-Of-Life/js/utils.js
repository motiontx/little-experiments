// Utils --------------------------------------------------------------

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

const newArray = (width, el) => Array(width).fill(el);

const newMatrix = (width, height, el) => {
  const matrix = [];
  for (let i = 0; i < height; i += 1) {
    matrix.push(newArray(width, el));
  }
  return matrix;
};

const optionsMenu = document.getElementById('options');

const SaveSettings = () => {
  dots = parseInt(sizeInput.value);
  fps = parseInt(fpsInput.value);
  bgColor = bgColorInput.value;
  tileColor = tileColorInput.value;
  reset();
  closeOptions();
};

const openOptions = () => {
  optionsMenu.classList.add('unfolded');
};

const closeOptions = () => {
  optionsMenu.classList.remove('unfolded');
};
