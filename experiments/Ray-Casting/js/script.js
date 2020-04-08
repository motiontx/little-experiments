// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById('canvas_container');

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
const width = canvas.width = 320;
const height = canvas.height = 200;

// TILES --------------------------------------------------------------

const tiles = [];
for (let i = 1; i <= 6; i += 1) {
  tiles[i] = new Image();
  tiles[i].src = `assets/${i}.png`;
}

// CONTROLLER ---------------------------------------------------------

const KEY_L = 65;
const KEY_U = 87;
const KEY_R = 68;
const KEY_D = 83;

let keyUp = false;
let keyDown = false;
let keyRight = false;
let keyLeft = false;

document.addEventListener('keydown', (evt) => {
  switch (evt.which) {
    case KEY_U:
      keyUp = true;
      break;
    case KEY_D:
      keyDown = true;
      break;
    case KEY_R:
      keyRight = true;
      break;
    case KEY_L:
      keyLeft = true;
      break;
  }
});

document.addEventListener('keyup', (evt) => {
  switch (evt.which) {
    case KEY_U:
      keyUp = false;
      break;
    case KEY_D:
      keyDown = false;
      break;
    case KEY_R:
      keyRight = false;
      break;
    case KEY_L:
      keyLeft = false;
      break;
  }
});

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
canvas.onclick = function () {
  canvas.requestPointerLock();
};

const lockChangeAlert = () => {
  if (document.pointerLockElement === canvas
    || document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener('mousemove', updatePosition);
  } else {
    console.log('The pointer lock status is now unlocked');
    document.removeEventListener('mousemove', updatePosition);
  }
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

let mouseX = 0;
const mouseSensitivity = 0.3;

const updatePosition = (e) => {
  mouseX += e.movementX * mouseSensitivity;
  if (mouseX > canvas.width) {
    mouseX = 0;
  }
  if (mouseX < 0) {
    mouseX = canvas.width;
  }
  updateRot((2 * mouseX * Math.PI) / canvas.width);
};

// MAP ----------------------------------------------------------------

const canvasMap = document.getElementById('canvasMap');
const ctxMap = canvasMap.getContext('2d');

const mapWidth = canvasMap.width;
const mapHeight = canvasMap.height;

// RESIZE -------------------------------------------------------------

window.addEventListener('resize', () => {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
});

// HELPERS ------------------------------------------------------------

const radians = (degrees) => degrees * Math.PI / 180;
const degrees = (radians) => radians * 180 / Math.PI;

const normalizeAngle = (angle) => {
  angle %= Math.PI * 2;
  if (angle < 0) angle += Math.PI * 2;
  return angle;
};

// --------------------------------------------------------------------

const fov = radians(60);
const playerHeight = 32;
const tileSize = 64;
const player = {
  x: 640,
  y: 416,
  angle: radians(0),
  velocity: 3,
};

const distanceToCanvas = (width * 0.5) / Math.tan(fov / 2);
const angleBetweenRays = fov / width;

const updateRot = (angle) => player.angle = normalizeAngle(angle) || player.angle;

// const movePlayer = () => {
//   if (keyUp) {
//     player.x += Math.cos(player.angle) * player.velocity;
//     player.y += Math.sin(player.angle) * player.velocity;
//   }
//   if (keyDown) {
//     player.x -= Math.cos(player.angle) * player.velocity;
//     player.y -= Math.sin(player.angle) * player.velocity;
//   }
//   if (keyLeft) {
//     player.x -= Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
//     player.y -= Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
//   }
//   if (keyRight) {
//     player.x += Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
//     player.y += Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
//   }
// }

const movePlayer = () => {
  // Not the most efficient way
  if (keyUp) {
    player.x += Math.cos(player.angle) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.x -= Math.cos(player.angle) * player.velocity;
    }
    player.y += Math.sin(player.angle) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.y -= Math.sin(player.angle) * player.velocity;
    }
  }
  if (keyDown) {
    player.x -= Math.cos(player.angle) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.x += Math.cos(player.angle) * player.velocity;
    }
    player.y -= Math.sin(player.angle) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.y += Math.sin(player.angle) * player.velocity;
    }
  }
  if (keyLeft) {
    player.x -= Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.x += Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
    }
    player.y -= Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.y += Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
    }
  }
  if (keyRight) {
    player.x += Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.x -= Math.cos(player.angle + Math.PI * 0.5) * player.velocity;
    }
    player.y += Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
    if (map[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] != 0) {
      player.y -= Math.sin(player.angle + Math.PI * 0.5) * player.velocity;
    }
  }
};

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 0, 5, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 2, 0, 1],
  [1, 0, 2, 0, 5, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 2, 0, 1],
  [1, 0, 2, 0, 5, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 5, 0, 2, 0, 1],
  [1, 0, 2, 0, 5, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 4, 0, 3, 3, 0, 4, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const drawMap = () => {
  ctxMap.clearRect(0, 0, mapWidth, mapHeight);

  const tileW = mapWidth / map[0].length;
  const tileH = mapHeight / map.length;

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] > 0) {
        ctxMap.lineWidth = 1;
        ctxMap.fillStyle = 'black';
        ctxMap.fillRect(j * tileW, i * tileH, tileW, tileH);
      }
    }
  }

  const dx = Math.cos(player.angle) * 10;
  const dy = Math.sin(player.angle) * 10;
  ctxMap.lineWidth = 3;
  ctxMap.strokeStyle = 'lightgreen';
  ctxMap.beginPath();
  ctxMap.moveTo((player.x / tileSize) * tileW, (player.y / tileSize) * tileH);
  ctxMap.lineTo((player.x / tileSize) * tileW + dx, (player.y / tileSize) * tileH + dy);
  ctxMap.stroke();

  ctxMap.fillStyle = 'tomato';
  ctxMap.beginPath();
  ctxMap.arc((player.x / tileSize) * tileW, (player.y / tileSize) * tileH, 3, 0, 2 * Math.PI);
  ctxMap.fill();
};

const raycasting = () => {
  ctx.clearRect(0, 0, width, height);

  const grd = ctx.createLinearGradient(113.500, 0.000, 113.500, 413.000);
  grd.addColorStop(0.000, 'rgba(41, 10, 89, 1.000)');
  grd.addColorStop(1.000, 'rgba(255, 124, 0, 1.000)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  const startAngle = player.angle - fov * 0.5;
  const endAngle = player.angle + fov * 0.5;
  let col = 0;

  for (let i = startAngle; i < endAngle; i += angleBetweenRays) {
    const angle = normalizeAngle(i);

    // Checking Horizontal Intersections
    const a = {
      x: 0,
      y: 0,
    };
    let Ya;
    let Xa;
    if (angle >= 0 && angle < Math.PI) {
      // DOWN
      a.y = Math.floor(player.y / tileSize) * tileSize + tileSize;
      Ya = tileSize;
    } else {
      // UP
      a.y = Math.floor(player.y / tileSize) * tileSize - 1;
      Ya = -tileSize;
    }
    a.x = player.x - (player.y - a.y) / Math.tan(angle);
    Xa = Ya / Math.tan(angle);

    // Checking Vertical Intersections
    const b = {
      x: 0,
      y: 0,
    };
    let Yb;
    let Xb;
    if (angle >= Math.PI * 0.5 && angle < Math.PI * 1.5) {
      // LEFT
      b.x = Math.floor(player.x / tileSize) * tileSize - 1;
      Xb = -tileSize;
    } else {
      // RIGHT
      b.x = Math.floor(player.x / tileSize) * tileSize + tileSize;
      Xb = tileSize;
    }
    b.y = player.y - (player.x - b.x) * Math.tan(angle);
    Yb = Xb * Math.tan(angle);

    while (true) {
      const w = Math.floor(a.x / tileSize);
      const h = Math.floor(a.y / tileSize);
      try {
        if (map[h][w] > 0) {
          break;
        } else {
          a.x += Xa;
          a.y += Ya;
        }
      } catch (e) {
        a.x += Infinity;
        a.y += Infinity;
        break;
      }
    }

    while (true) {
      const w = Math.floor(b.x / tileSize);
      const h = Math.floor(b.y / tileSize);
      try {
        if (map[h][w] > 0) {
          break;
        } else {
          b.x += Xb;
          b.y += Yb;
        }
      } catch (e) {
        b.x += Infinity;
        b.y += Infinity;
        break;
      }
    }

    const dxA = a.x - player.x;
    const dyA = a.y - player.y;
    const distA = Math.hypot(dxA, dyA);

    const dxB = b.x - player.x;
    const dyB = b.y - player.y;
    const distB = Math.hypot(dxB, dyB);

    let distance; let relativePosTile; let w; let
      h;
    if (distA < distB) {
      distance = distA;
      relativePosTile = Math.floor(a.x % tileSize);
      w = Math.floor(a.x / tileSize);
      h = Math.floor(a.y / tileSize);
    } else {
      distance = distB;
      relativePosTile = Math.floor(b.y % tileSize);
      w = Math.floor(b.x / tileSize);
      h = Math.floor(b.y / tileSize);
    }

    distance *= Math.cos(angle - player.angle);
    const projectedSliceHeight = (tileSize / distance) * distanceToCanvas;

    ctx.drawImage(tiles[map[h][w]], relativePosTile, 0, 1, 64, col, height * 0.5 - projectedSliceHeight * 0.5, 1, projectedSliceHeight);
    col += 1;
  }
};

const loop = () => {
  requestAnimationFrame(loop);
  movePlayer();
  drawMap();
  raycasting();
};

loop();
