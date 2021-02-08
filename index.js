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
    let self = this;
    this.chooseColor = this.chooseColor.bind(self);
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
    this.addClickEvents();
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

  addClickEvents() {
    this.colors.green.addEventListener('click', this.chooseColor);
    this.colors.red.addEventListener('click', this.chooseColor);
    this.colors.yellow.addEventListener('click', this.chooseColor);
    this.colors.blue.addEventListener('click', this.chooseColor);
    /*En this.chooseColor hemos usado el método bind en la función initialize para que su this siga siendo el objeto de la clase Game, y no el objeto botón seleccionado.*/
  }

  //Siempre que usamos manejadores de eventos, comúnmente los atrapamos en un paramatro 'ev'. Entonces usemoslo.
  chooseColor(ev) {
    console.log(this);
  }
}

function empezarJuego() {
  let game = new Game();
}
//Esta función la llamamos con el evento onClick desde html.