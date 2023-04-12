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
let isSoundMuted;
let isFullScreen = false;
let portrait = window.matchMedia("(orientation: portrait)");

// ---- Functions start here ----

function init() {
  document.getElementById("startscreen").classList.remove("d-none");
  detectMobileDevice();
  touchStart();
  touchEnd();
}

function startGame() {
  generateLevel();
  showGameUI();
  canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
  world = new World(canvas, keyboard, level1);
  loadAllImages();
  loadSoundSettings();
}

function reloadGame() {
  window.location.reload(true);
}

function stopGame() {
  clearAllIntervals();
  setTimeout(() => {
    document.getElementById("canvas").classList.add("d-none");
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
  } else {
    endscreen.innerHTML = renderRandomGameOverScreen()
  };
  hideGameUI();
  endscreen.classList.remove("d-none");
}

function showGameUI() {
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("infobtn").classList.add("d-none");
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

// ---- Functions for keyboard usage ----

window.addEventListener("keydown", (event) => {
  if (event.code == 'ArrowRight') {
    keyboard.KEY_RIGHT = true;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.KEY_LEFT = true;
  }
  if (event.code == 'Space') {
    keyboard.KEY_SPACE = true;
  }
  if (event.code == 'KeyD') {
    keyboard.KEY_D = true;
  }
  if (event.code == 'Escape') {
    keyboard.KEY_ESC = true;
    leaveFullscreen();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code == 'ArrowRight') {
    keyboard.KEY_RIGHT = false;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.KEY_LEFT = false;
  }
  if (event.code == 'Space') {
    keyboard.KEY_SPACE = false;
  }
  if (event.code == 'KeyD') {
    keyboard.KEY_D = false;
  }
  if (event.code == 'KeyEscape') {
    keyboard.KEY_ESC = false;
    leaveFullscreen();
  }
});

portrait.addEventListener("change", () => checkMobileOrientation())

function detectMobileDevice() {
  if (window.innerWidth < 500 && window.innerHeight < 900) {
    checkMobileOrientation()
  }
}

function checkMobileOrientation() {
  if (portrait.matches) {
    document.getElementById("rotationAlert").classList.remove("d-none");
    document.getElementById("controlsdescription").classList.add("d-none");
  } else {
    document.getElementById("rotationAlert").classList.add("d-none");
    document.getElementById("controlsdescription").classList.remove("d-none");
  }
}

function touchStart() {
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
  document.getElementById("btn-sound").addEventListener("touchstart", (e) => {
    keyboard.KEY_M = true;
    toggleSound();
    e.preventDefault();
  });
  document.getElementById("btn-fullscreen").addEventListener("touchstart", (e) => {
    keyboard.KEY_ESC = true;
      toggleFullscreen();
      e.preventDefault();
    });
}

function touchEnd() {
  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    keyboard.KEY_LEFT = false;
    e.preventDefault();
  });
  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    keyboard.KEY_RIGHT = false;
    e.preventDefault();
  });
  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    keyboard.KEY_SPACE = false;
    e.preventDefault();
  });
  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    keyboard.KEY_D = false;
    e.preventDefault();
  });
  document.getElementById("btn-sound").addEventListener("touchstart", (e) => {
    keyboard.KEY_M = false;
    e.preventDefault();
  });
  document.getElementById("btn-fullscreen").addEventListener("touchstart", (e) => {
      keyboard.KEY_ESC = false;
      e.preventDefault();
    });
}

// ---- Functions for fullscreen functionality ----
function toggleFullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (!isFullScreen) {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('endscreen').classList.add('fullscreen');
    document.getElementById('mainheadline').classList.add('d-none');
    enterFullscreen(fullscreen);
    isFullScreen = true;
  } else {
    
    leaveFullscreen();
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener("fullscreenchange", fullscreenchangelog);

function fullscreenchangelog() {
  if (!document.fullscreenElement) {
  leaveFullscreen();
}
}

// ---- Functions for audio ----

function toggleSound() {
  isSoundMuted = !isSoundMuted;
  muteAudioFiles(isSoundMuted);  
  setSoundIcon();
  saveAudioSetting();
}

function setSoundIcon() {
  let soundicon = document.getElementById("soundicon");
  if (isSoundMuted) {
    soundicon.src = "./img/1_controls/muted.png";
  } else {
    soundicon.src = "./img/1_controls/loud.png";
  }
}

function saveAudioSetting() {
  localStorage.setItem("isEPLSoundMuted", isSoundMuted);
}

function loadSoundSettings() {
  isSoundMuted = localStorage.getItem("isEPLSoundMuted");
  setSoundIcon();
}

function muteAudioFiles(boolean) {
  world.character.walking_sound.muted = boolean;
  world.character.hurt_sound.muted = boolean;
  world.character.dead_sound.muted = boolean;
  world.character.jump_sound.muted = boolean;
  world.chickenHurt_sound.muted = boolean;
  world.endbossDead_sound = boolean;
  world.backgroundMusic.muted = boolean;
}

function leaveFullscreen() {
  if (isFullScreen) {
  document.getElementById('canvas').classList.remove('fullscreen');
  document.getElementById('endscreen').classList.remove('fullscreen');
  document.getElementById('mainheadline').classList.remove('d-none');
  isFullScreen = false;}
}

