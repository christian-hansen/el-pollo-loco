let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard)

console.log("My character is", world.character);
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

// function keypress() {
//     input = document.addEventListener('keypress', (event) => event.code)
// }