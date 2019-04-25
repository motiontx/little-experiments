
class Door {
  constructor(id) {
    this.view = document.getElementById(id);
    this.openState = false;
    this.evt = onclick


    this.view.addEventListener('click', () => {
      this.open();
    });

  }

  open(){
    this.view.classList.add("open");
    this.openState = true;
  }

  close(){
    this.view.classList.remove("open");
    this.openState = false;
  }

}


let door_1 = new Door("door_1");
let door_2 = new Door("door_2");
let door_3 = new Door("door_3");
