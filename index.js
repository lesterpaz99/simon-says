const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnStart = document.getElementById('btn-start');

const LAST_LEVEL = 10;

//Ctrl + D para recorrer y editar mismas palabras en el código

Swal.fire({
  title: 'Welcome to Simon Says :D',
  text: `Press Play to start the game. You will play ${LAST_LEVEL} levels.`,
  width: 600,
  padding: '1.5em',
  confirmButtonText: 'Play!',
  background: '#fff url(./bkground.jpg)',
  imageUrl: './simon.gif',
  imageWidth: 80,
  imageHeight: 80,
  imageAlt: 'Custom image',
  backdrop: `
    rgba(0,0,123,0.4)
    url("./tenor.gif")
    left top
    no-repeat
  `
})

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 100);
  }

  initialize() {
    let self = this;
    this.chooseColor = this.chooseColor.bind(self);
    this.nextLevel = this.nextLevel.bind(self);
    this.toggleStartBtn();
    this.level = 1;
    this.colors = {
      green,
      red,
      yellow,
      blue
    }
  }

  toggleStartBtn() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add('hide');
    }
  }

  generateSequence() {
      this.sequence = new Array(LAST_LEVEL).fill(0).map(() => Math.floor(Math.random() * 4));
      /*La función map no funciona cuando los elementos no están definidos en un array y no tienen un valor. Es por ello que necesitan un valor aunque sea 0*/
  }

  nextLevel() {
    this.subLevel = 0;
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

  transformColorToNumber(color) {
    switch(color) {
      case 'green': 
        return 0;
      case 'red': 
        return 1;
      case 'yellow':
        return 2;
      case 'blue': 
        return 3;
    }
  }

  lightSequence() {
    for(let i = 0; i < this.level; i++) {
      let color = this.transformNumberToColor(this.sequence[i]);
      setTimeout(() => this.lightColor(color, i), 1000 * i);
    }
  }

  lightColor(color, i) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.turnOffColor(color, i), 350);
  }

  turnOffColor(color, i) {
    this.colors[color].classList.remove('light');
        if ((i+1) === this.level) {
            this.addClickEvents();
        }
  }

  addClickEvents() {
    this.colors.green.addEventListener('click', this.chooseColor);
    this.colors.red.addEventListener('click', this.chooseColor);
    this.colors.yellow.addEventListener('click', this.chooseColor);
    this.colors.blue.addEventListener('click', this.chooseColor);
    /*En this.chooseColor hemos usado el método bind en la función initialize para que su this siga siendo el objeto de la clase Game, y no el objeto botón seleccionado.*/
  }

  removeClickEvents() {
    this.colors.green.removeEventListener('click', this.chooseColor);
    this.colors.red.removeEventListener('click', this.chooseColor);
    this.colors.yellow.removeEventListener('click', this.chooseColor);
    this.colors.blue.removeEventListener('click', this.chooseColor);
  }

  //Siempre que usamos manejadores de eventos, comúnmente los atrapamos en un parámetro 'ev'. Entonces usemoslo.
  chooseColor(ev) {
    const colorName = ev.target.dataset.color;
    const numberColor = this.transformColorToNumber(colorName);
    this.lightColor(colorName);
    if(numberColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if(this.subLevel === this.level) {
        Toast.fire({
          icon: 'success',
          title: `Level ${this.level} passed`
        });
        this.level++;
        this.removeClickEvents();
        if(this.level === (LAST_LEVEL + 1)) {
          Toast.fire({});
          this.wonTheGame();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.gameOver();
    }
  }

  wonTheGame() {
    swal('Great!', 'You passed this level :D', 'success')
    .then(() => {
      this.initialize();
    });
  }

  gameOver() {
    swal('GAME OVER', 'You lost, press OK to start a new game', 'error')
    .then(() => {
      this.removeClickEvents();
      this.initialize();
    })
  }
}

function empezarJuego() {
  let game = new Game();
}
//Esta función la llamamos con el evento onClick desde html.