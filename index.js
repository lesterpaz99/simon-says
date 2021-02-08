const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnStart = document.getElementById('btn-start');

//Ctrl + D para recorrer y editar mismas palabras en el codigo

class Game {
  constructor() {
    this.initialize();
    this.generateFrequency();
  }

  initialize() {
    btnStart.classList.add("hide");
  }

  generateFrequency() {
      this.sequence = new Array(10).fill(0).map(() => Math.floor(Math.random() * 4));
  }
}

function empezarJuego() {
  let game = new Game();
}