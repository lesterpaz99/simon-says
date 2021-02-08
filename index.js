const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnStart = document.getElementById('btn-start');

//Ctrl + D para recorrer y editar mismas palabras en el código

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    this.nextLevel();
  }

  initialize() {
    btnStart.classList.add("hide");
    this.level = 7;
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

  nextLevel() {
    this.lightSequence();
  }

  transformNumberToColor(num) {
    switch(num) {
      case 0: 
        return 'green';
      case 1: 
        return 'red';
      case 2:
        return 'yellow';
      case 3: 
        return 'blue';
    }
  }

  lightSequence() {
    for(let i = 0; i < this.level; i++) {
      let color = this.transformNumberToColor(this.sequence[i]);
      setTimeout(() => this.lightColor(color), 1000 * i);
    }
  }

  lightColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light');
  }
}

function empezarJuego() {
  let game = new Game();
}
//Esta función la llamamos con el evento onClick desde html.