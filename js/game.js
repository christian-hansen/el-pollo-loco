let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let allIntervals = [];

function init() {
    document.getElementById('startscreen').classList.remove('d-none');
}

function startGame() {
generateLevel()
document.getElementById('startscreen').classList.add('d-none');
canvas = document.getElementById('canvas');
canvas.classList.remove('d-none');
world = new World(canvas, keyboard)

console.log("My character is", world.character);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


function stopGame() {
    clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  };

function showEndScreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('endscreen').classList.remove('d-none');
    }, 1000);

}




window.addEventListener('keydown', (event) => {
if(event.keyCode == 39) {
    keyboard.KEY_RIGHT = true;
}
if(event.keyCode == 37) {
    keyboard.KEY_LEFT = true;
}
if(event.keyCode == 38) {
    keyboard.KEY_UP = true;
}
if(event.keyCode == 40) {
    keyboard.KEY_DOWN = true;
}
if(event.keyCode == 32) {
    keyboard.KEY_SPACE = true;
}
if(event.keyCode == 68) {
    keyboard.KEY_D = true;
    console.log("D");
}
if(event.keyCode == 80) {
    keyboard.KEY_P = true;
}
});

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39) {
        keyboard.KEY_RIGHT = false;
    }
    if(event.keyCode == 37) {
        keyboard.KEY_LEFT = false;
    }
    if(event.keyCode == 38) {
        keyboard.KEY_UP = false;
    }
    if(event.keyCode == 40) {
        keyboard.KEY_DOWN = false;
    }
    if(event.keyCode == 32) {
        keyboard.KEY_SPACE = false;
    }
    if(event.keyCode == 68) {
        keyboard.KEY_D = false;
    }
    if(event.keyCode == 80) {
        keyboard.KEY_P = false;
    }
    });

