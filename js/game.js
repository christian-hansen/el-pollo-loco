let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let allIntervals = [];
let gameOverScreens = [
  "img/9_intro_outro_screens/game_over/game over!.png",
  "img/9_intro_outro_screens/game_over/game over.png",
  "img/9_intro_outro_screens/game_over/oh no you lost!.png",
  "img/9_intro_outro_screens/game_over/you lost.png",
];

function init() {
  document.getElementById("startscreen").classList.remove("d-none");
//   detectMobileDevice();
  touchEventsStart();
  touchEventsEnd();
}
 


function startGame() {
  generateLevel();
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("btn-fullscreen").classList.remove("d-none");
  document.getElementById("btn-soundon").classList.remove("d-none");
  document.getElementById("btn-soundoff").classList.remove("d-none");
  document.getElementById("btn-left").classList.remove("d-none");
  document.getElementById("btn-right").classList.remove("d-none");
  document.getElementById("btn-jump").classList.remove("d-none");
  document.getElementById("btn-throw").classList.remove("d-none");
  canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
  world = new World(canvas, keyboard, level1);
}

function reloadGame(){
window.location.reload(true);
}

function stopGame() {
  clearAllIntervals();
  setTimeout(() => {
    document.getElementById("canvas").classList.add('d-none');
    showEndScreen();
  }, 1000);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showEndScreen() {
  let endscreen = document.getElementById("endscreen");
  endscreen.innerHTML = renderGameOverScreen();

  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("btn-fullscreen").classList.add("d-none");
  document.getElementById("btn-soundon").classList.add("d-none");
  document.getElementById("btn-soundoff").classList.add("d-none");
  document.getElementById("btn-left").classList.add("d-none");
  document.getElementById("btn-right").classList.add("d-none");
  document.getElementById("btn-jump").classList.add("d-none");
  document.getElementById("btn-throw").classList.add("d-none");
  endscreen.classList.remove("d-none");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.KEY_RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.KEY_LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.KEY_UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.KEY_DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.KEY_SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.KEY_D = true;
    console.log("D");
  }
  if (event.keyCode == 80) {
    keyboard.KEY_P = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.KEY_RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.KEY_LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.KEY_UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.KEY_DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.KEY_SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.KEY_D = false;
  }
  if (event.keyCode == 80) {
    keyboard.KEY_P = false;
  }
});

// Templates
function renderGameOverScreen() {
  let min = 0;
  let max = gameOverScreens.length - 1;
  let randomScreen = Math.floor(Math.random() * (max - min + 1)) + min;

  return `<img src="${gameOverScreens[randomScreen]}" width="853" height="480"></img>
  <div class="button flex-center" onclick="reloadGame()">Back to Start</div>`;
}



//TODO
// function detectMobileDevice() {
//     if (window.innerWidth < 750) {
//       document.getElementById("mobileAlert").classList.remove("d-none");
  
//       checkMobileOrientation();
//     }
// }

// function checkMobileOrientation() {
//     if (window.matchMedia("(orientation: landscape)").matches) {
//       document.getElementById("mobileAlert").classList.remove("d-none");
//       document.getElementById("fullscreenalert").classList.add("d-none");
//     } else {
//       document.getElementById("mobileAlert").classList.add("d-none");
  
//       checkFullscreen();
//     }
//   }

//   function checkFullscreen() {
//     if (!document.fullscreenElement) {
//       document.getElementById("fullscreenalert").classList.remove("d-none");
//     }
//   }

//   window.addEventListener("orientationchange", checkMobileOrientation);


  function touchEventsStart() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      keyboard.KEY_LEFT = true;
      e.preventDefault();
    });
    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      keyboard.KEY_RIGHT = true;
      e.preventDefault();
    });
    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
      keyboard.KEY_SPACE = true;
      e.preventDefault();
    });
    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
      keyboard.KEY_D = true;
      e.preventDefault();
    });
  }
  
  function touchEventsEnd() {
    document.getElementById("btn-left").addEventListener("touchend", (ev) => {
      keyboard.LEFT = false;
      e.preventDefault();
    });
    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      keyboard.RIGHT = false;
      e.preventDefault();
    });
    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
      keyboard.SPACE = false;
      e.preventDefault();
    });
    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
      keyboard.D = false;
      e.preventDefault();
    });
  }


//   function toggleFullscreen() {
//     let gamebox = document.getElementById("gamebox");
//     let screenicon = document.getElementById("size");
//     let startscreen = document.getElementById("startscreen");
//     let endscreen = document.getElementById("endscreen");
  
//     if (!document.fullscreenElement) {
//       enterFullscreen(gamebox, screenicon, endscreen, startscreen);
//     } else {
//       exitFullscreenMode(gamebox, screenicon, endscreen, startscreen);
//     }
//   }
  
//   function enterFullscreen(gamebox, screenicon, endscreen, startscreen) {
//     gamebox.requestFullscreen();
//     canvas.classList.add("fullscreen");
//     startscreen.classList.add("fullscreen");
//     endscreen.classList.add("fullscreen");
//     screenicon.src = "img/minimize.png";
//   }
  
//   function exitFullscreenMode(screenicon, endscreen, startscreen) {
//     document.exitFullscreen();
//     canvas.classList.remove("fullscreen");
//     startscreen.classList.remove("fullscreen");
//     endscreen.classList.remove("fullscreen");
//     screenicon.src = "img/fullscreen.png";
//   }