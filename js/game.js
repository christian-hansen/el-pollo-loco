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
let soundActive = false;
let isFullScreen = false;

function init() {
  document.getElementById("startscreen").classList.remove("d-none");
  detectMobileDevice();
}
 


function startGame() {
  generateLevel();
  showGameUI();
  canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
  world = new World(canvas, keyboard, level1);
  toggleSound();
  touchStart();
  touchEnd();
}

function reloadGame(){
window.location.reload(true);
}

function stopGame() {
  clearAllIntervals();
  setTimeout(() => {
    document.getElementById("canvas").classList.add('d-none');
    world.backgroundMusic.pause();
    showEndScreen();
  }, 1000);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showEndScreen() {
  let endscreen = document.getElementById("endscreen");
  if (world.gameWon) {
    endscreen.innerHTML = renderGameWonScreen();
  } else
  endscreen.innerHTML = renderGameOverScreen();
  hideGameUI();
  endscreen.classList.remove("d-none");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.KEY_RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.KEY_LEFT = true;
  }
  if (event.keyCode == 32) {
    keyboard.KEY_SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.KEY_D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.KEY_RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.KEY_LEFT = false;
  }
  if (event.keyCode == 32) {
    keyboard.KEY_SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.KEY_D = false;
  }
});

function showGameUI() {
    document.getElementById("startscreen").classList.add("d-none");
    document.getElementById("btn-fullscreen").classList.remove("d-none");
    document.getElementById("btn-sound").classList.remove("d-none");
    document.getElementById("btn-left").classList.remove("d-none");
    document.getElementById("btn-right").classList.remove("d-none");
    document.getElementById("btn-jump").classList.remove("d-none");
    document.getElementById("btn-throw").classList.remove("d-none");

}

function hideGameUI() {
    document.getElementById("btn-fullscreen").classList.add("d-none");
    document.getElementById("btn-sound").classList.add("d-none");
    document.getElementById("btn-left").classList.add("d-none");
    document.getElementById("btn-right").classList.add("d-none");
    document.getElementById("btn-jump").classList.add("d-none");
    document.getElementById("btn-throw").classList.add("d-none");
}

// Templates
function renderGameOverScreen() {
  let min = 0;
  let max = gameOverScreens.length - 1;
  let randomScreen = Math.floor(Math.random() * (max - min + 1)) + min;

  return `<img src="${gameOverScreens[randomScreen]}" width="853" height="480"></img>
  <div class="button flex-center" onclick="reloadGame()">Back to Start</div>`;
}

function renderGameWonScreen() {
    return `<img src="img/9_intro_outro_screens/game_over/gamewon2.png" width="853" height="480"></img>
  <div class="button flex-center" onclick="reloadGame()">Back to Start</div>`;
}


//TODO
function detectMobileDevice() {
    if (window.innerWidth < 500 && window.innerHeight < 900) {
      document.getElementById("rotationAlert").classList.remove("d-none");
  
      checkMobileOrientation();
    }
}

function checkMobileOrientation() {
    if (!window.matchMedia("(orientation: landscape)").matches) {
      document.getElementById("rotationAlert").classList.remove("d-none");
    //   document.getElementById("fullscreenalert").classList.add("d-none");
    } else {
      document.getElementById("rotationAlert").classList.add("d-none");
  
    //   checkFullscreen();
    }
  }

//   function checkFullscreen() {
//     if (!document.fullscreenElement) {
//       document.getElementById("fullscreenalert").classList.remove("d-none");
//     }
//   }

  window.addEventListener("orientationchange", checkMobileOrientation);


  function touchStart() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      keyboard.KEY_LEFT = true;
      e.preventDefault();
    });
    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      keyboard.KEY_RIGHT = true;
      console.log("Läuft rechts");
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
  
  function touchEnd() {
    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      keyboard.LEFT = false;
      e.preventDefault();
    });
    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      keyboard.RIGHT = false;
      console.log(keyboard.RIGHT);
      console.log("Läuft nicht mehr rechts");
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


  function toggleFullscreen() {
    let fullscreen = document.getElementById("fullscreen");
    if (!isFullScreen) {
      enterFullscreen(fullscreen);
      isFullScreen = true}
      else {
        exitFullscreen();
        isFullScreen = false;
      }
  }
  
function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


function toggleSound() {
    let soundicon = document.getElementById('soundicon');
    if (soundActive) {
        soundActive = false;
        world.backgroundMusic.volume = 0.0;
        soundicon.src = './img/1_controls/muted.png';
    }  else {
        soundActive = true;
        world.backgroundMusic.volume = 0.3;
        soundicon.src = './img/1_controls/loud.png';
    }
}