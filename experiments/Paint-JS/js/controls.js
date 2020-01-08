// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const speechBubbles = document.getElementsByClassName("speech-bubble");

const closeTools = () => {
  for (let i = 0; i < speechBubbles.length; i++) {
    speechBubbles[i].classList.add('d-none');
  }
}

const openTool = (id) => {
  closeTools();
  document.getElementById(id).classList.remove('d-none');
}

const applyChanges = () => {
  color = colorInput.value;
  lineWidth = sizeInput.value;
}

// Size ------------------------------------------------------------ //

const sizeButton = document.getElementById('sizeButton');
sizeButton.addEventListener("click", () => openTool("sizeBubble"), false);

const sizeInput = document.getElementById('sizeInput');
sizeInput.addEventListener("change", applyChanges);

const addSize = document.getElementById('addSize');
const removeSize = document.getElementById('removeSize');

addSize.addEventListener("click", () => {sizeInput.value++; applyChanges()}, false);
removeSize.addEventListener("click", () => {sizeInput.value--; applyChanges()}, false);

document.addEventListener('keypress', (e) => {
  if (e.key == "+") sizeInput.value++;
  else if (e.key == "-") sizeInput.value--;
  applyChanges();
});

// Color ----------------------------------------------------------- //

const colorButton = document.getElementById('colorButton');
colorButton.addEventListener("click", () => openTool("colorBubble"), false);

const colorInput = document.getElementById('colorInput');
colorInput.addEventListener("change", applyChanges);

// Tool ------------------------------------------------------------ //

const toolButton = document.getElementById('toolButton');
toolButton.addEventListener("click", () => openTool("toolBubble"), false);

// ----------------------------------------------------------------- //

closeTools();
applyChanges();
