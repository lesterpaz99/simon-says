const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnStart = document.getElementById('btn-start');

//Ctrl + D para recorrer y editar mismas palabras en el codigo

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
  }

  initialize() {
    btnStart.classList.add("hide");
    this.level = 1;
    this.colors = {
      green,
      red,
      yellow,
      blue
    }
  }

  generateSequence() {
      this.sequence = new Array(10).fill(0).map(() => Math.floor(Math.random() * 4));
      /*La función map no funciona cuando los elementos no están definidos en un array y no tienen un valor. Es por ello que necesitan un valor aunque sea 0*/
  }
}

function empezarJuego() {
  let game = new Game();
}