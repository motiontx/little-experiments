// ----------------------------------------------------------------- //
// ------------- ►►► </> with ♥ by Vittorio Retrivi ◄◄◄ ------------ //
// ----------------------------------------------------------------- //

class Door {
  constructor(id) {
    this.view = document.getElementById(id);
    this.imgView = document.getElementById(`${id}_img`);
    this.isOpen = false;
    this.winningDoor = false;
    this.setState();
  }

  setWinningDoor(value) {
    this.winningDoor = value;
    this.setState();
  }

  setState() {
    this.imgView.src = this.winningDoor ? "assets/frog.png" : "assets/tiger.png";
  }

  open() {
    this.view.classList.add("open");
    this.isOpen = true;
  }

  close() {
    this.view.classList.remove("open");
    this.isOpen = false;
  }

}

class Game {
  constructor() {
    this.doors = [];

    this.gamesView = document.getElementById("i");
    this.pView = document.getElementById("p");
    this.wolView = document.getElementById("wol");
    for (let i = 1; i <= 3; i++) {
      let door = new Door(`door_${i}`);
      this.doors.push(door);
    }
    for (let door of this.doors) {
      door.view.addEventListener('click', () => {
        this.step(door);
      });
    }
    this.fullReset();
  }

  step(selectedDoor) {
    if (this.allDoorsClosed) {
      while (true) {
        let doorToOpen = this.doors[Math.floor(Math.random() * this.doors.length)];
        if (!doorToOpen.winningDoor && doorToOpen != selectedDoor) {
          doorToOpen.open();
          break;
        }
      }
      this.allDoorsClosed = false;
    } else {
      if (!selectedDoor.isOpen) {
        this.openAllDoors();
        this.wolView.innerHTML = (selectedDoor.winningDoor ? "ganaste" : "perdiste");
        this.games++;
        if (selectedDoor.winningDoor) {
          this.victories++;
        }
        this.updateView();
      }
    }
  }

  updateView() {
    this.gamesView.innerHTML = this.games;
    this.pView.innerHTML = Math.floor(this.victories * 100 / this.games);
  }

  openAllDoors() {
    for (let door of this.doors) {
      door.open();
    }
  }

  reset() {
    for (let door of this.doors) {
      door.close();
      door.setWinningDoor(false);
    }
    let winningDoor = this.doors[Math.floor(Math.random() * this.doors.length)];
    winningDoor.setWinningDoor(true);
    this.allDoorsClosed = true;
  }

  fullReset() {
    this.games = 0;
    this.victories = 0;

    this.reset();
    this.updateView();
  }


}


let game = new Game();
