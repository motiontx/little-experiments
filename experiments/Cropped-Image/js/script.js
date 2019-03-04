const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const imageInput = document.getElementById('imageInput');

const imageInputButton = document.getElementById('imageInput_button');

const sliderH = document.getElementById('sliderH');
const sliderV = document.getElementById('sliderV');

const sliderValueH = document.getElementById('sliderValueH');
const sliderValueV = document.getElementById('sliderValueV');

let width, height;

let imageData;
let pixels;
let numPixels;

let divisionsY = 50;
let divisionsX = 50;

let image = new Image();
image.src = "../assets/example.png";
image.onload = () => load();

// --------------------------------------------------------------------

sliderH.oninput = function() {
  sliderValueH.innerHTML = this.value;
  divisionsY = this.value;
}

sliderV.oninput = function() {
  sliderValueV.innerHTML = this.value;
  divisionsX = this.value;
}

imageInputButton.onclick = function() {
  imageInput.click();
}

imageInput.onchange = function(e) {
  let files = e.target.files; // FileList object
  let file = files[0];
  if (file.type.match('image.*')) {
    let reader = new FileReader();
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      if (e.target.readyState == FileReader.DONE) {
        image.src = e.target.result;
        image.onload = () => load();
      }
    }
  } else {
    alert("not an image");
  }
};

function load() {
  let excessV = image.height % divisionsY;
  let excessH = image.width % divisionsX;

  width = canvas.width = image.width - excessH;
  height = canvas.height = image.height - excessV;

  ctx.drawImage(image, 0, 0);

  imageData = ctx.getImageData(0, 0, width, height);
  pixels = imageData.data;
  numPixels = imageData.width * imageData.height;
}

function cropVertical() {
  let even = [];
  let odd = [];
  let div = width / divisionsX;
  for (let i = 0; i < numPixels; i++) {

    let r = pixels[i * 4],
      g = pixels[i * 4 + 1],
      b = pixels[i * 4 + 2];
    a = pixels[i * 4 + 3];

    if (Math.floor((i % width) / div) % 2 == 0) {
      odd.push(r);
      odd.push(g);
      odd.push(b);
      odd.push(a);
    } else {
      even.push(r);
      even.push(g);
      even.push(b);
      even.push(a);
    }
  }

  let j = 0;
  let k = 0;
  for (let i = 0; i < numPixels; i++) {
    if (i % width < Math.floor(divisionsX * 0.5) * div) {
      pixels[i * 4] = even[j];
      pixels[i * 4 + 1] = even[j + 1];
      pixels[i * 4 + 2] = even[j + 2];
      pixels[i * 4 + 3] = even[j + 3];
      j += 4;
    } else {
      pixels[i * 4] = odd[k];
      pixels[i * 4 + 1] = odd[k + 1];
      pixels[i * 4 + 2] = odd[k + 2];
      pixels[i * 4 + 3] = odd[k + 3];
      k += 4;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function cropHorizontal() {
  let even = [];
  let odd = [];
  let div = height / divisionsY;
  for (let i = 0; i < numPixels; i++) {

    let r = pixels[i * 4];
    let g = pixels[i * 4 + 1];
    let b = pixels[i * 4 + 2];
    let a = pixels[i * 4 + 3];

    if (Math.floor(i / (div * width)) % 2 == 0) {
      odd.push(r);
      odd.push(g);
      odd.push(b);
      odd.push(a);
    } else {
      even.push(r);
      even.push(g);
      even.push(b);
      even.push(a);
    }
  }

  let c = 0;
  for (let i = 0; i < even.length; i += 4) {
    pixels[c * 4] = even[i];
    pixels[c * 4 + 1] = even[i + 1];
    pixels[c * 4 + 2] = even[i + 2];
    pixels[c * 4 + 3] = even[i + 3];
    c++;
  }
  for (let i = 0; i < odd.length; i += 4) {
    pixels[c * 4] = odd[i];
    pixels[c * 4 + 1] = odd[i + 1];
    pixels[c * 4 + 2] = odd[i + 2];
    pixels[c * 4 + 3] = odd[i + 3];
    c++;
  }
  ctx.putImageData(imageData, 0, 0);
}

function reset() {
  load();
}

function crop(iterations) {
  load();
  for (var i = 0; i < iterations; i++) {
    cropVertical();
    cropHorizontal();
  }
}
