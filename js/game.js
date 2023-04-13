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

/**
 * The function initializes the webpage by detecting mobile
 * devices, and setting up touch event listeners.
 */
function init() {
  detectMobileDevice();
  touchStart();
  touchEnd();
}

/**
 * The function starts the game by generating a level, showing the game UI, creating a canvas,
 * initializing a world object, and loading sound settings.
 */
function startGame() {
  generateLevel();
  showGameUI();
  canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
  world = new World(canvas, keyboard, level1);
  loadSoundSettings();

  console.log(world);
}

/**
 * The function reloads the current webpage.
 */
// function reloadGame() {
//   window.location.reload(true);
// }

function reloadGame() {
  document.getElementById('endscreen').classList.add('d-none')
  startGame()
}

/**
 * The function stops the game by clearing all intervals, hiding the canvas, pausing the background
 * music, and showing the end screen after a delay of 1 second.
 */
function stopGame() {
  clearAllIntervals();
  setTimeout(() => {
    document.getElementById("canvas").classList.add("d-none");
    world.backgroundMusic.pause();
    showEndScreen();
    resetLevel();
  }, 1000);
}

/**
 * The function clears all intervals set by the window object.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * The function displays either a game won or game over screen and hides the game UI.
 */
function showEndScreen() {
  let endscreen = document.getElementById("endscreen");
  if (world.gameWon) {
    endscreen.innerHTML = renderGameWonScreen();
  } else {
    endscreen.innerHTML = renderRandomGameOverScreen();
  }
  hideGameUI();
  endscreen.classList.remove("d-none");
}

// ---- Functions for keyboard usage ----

window.addEventListener("keydown", (event) => {
  if (event.code == "ArrowRight") {
    keyboard.KEY_RIGHT = true;
  }
  if (event.code == "ArrowLeft") {
    keyboard.KEY_LEFT = true;
  }
  if (event.code == "Space") {
    keyboard.KEY_SPACE = true;
  }
  if (event.code == "KeyD") {
    keyboard.KEY_D = true;
  }
  if (event.code == "KeyM") {
    keyboard.KEY_M = true;
    toggleSound();
  }
  if (event.code == "Escape") {
    keyboard.KEY_ESC = true;
    leaveFullscreen();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code == "ArrowRight") {
    keyboard.KEY_RIGHT = false;
  }
  if (event.code == "ArrowLeft") {
    keyboard.KEY_LEFT = false;
  }
  if (event.code == "Space") {
    keyboard.KEY_SPACE = false;
  }
  if (event.code == "KeyD") {
    keyboard.KEY_D = false;
  }
  if (event.code == "KeyM") {
    keyboard.KEY_M = false;
  }
  if (event.code == "KeyEscape") {
    keyboard.KEY_ESC = false;
    leaveFullscreen();
  }
});

portrait.addEventListener("change", () => checkMobileOrientation());

/**
 * The function detects if the device accessing the website has a small screen size and calls another
 * function to check its orientation if it is a mobile device.
 */
function detectMobileDevice() {
  if (window.innerWidth < 500 && window.innerHeight < 900) {
    checkMobileOrientation();
  }
}

/**
 * The function checks the orientation of a mobile device and displays or hides certain elements based
 * on whether it is in portrait or landscape mode.
 */
function checkMobileOrientation() {
  if (portrait.matches) {
    document.getElementById("rotationAlert").classList.remove("d-none");
    document.getElementById("controlsdescription").classList.add("d-none");
  } else {
    document.getElementById("rotationAlert").classList.add("d-none");
    document.getElementById("controlsdescription").classList.remove("d-none");
  }
}

/**
 * The function adds touch event listeners to buttons and updates the keyboard object accordingly.
 */
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

/**
 * The function sets event listeners for touch end events on specific buttons and updates corresponding
 * keyboard keys to false.
 */
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

/**
 * The function toggles fullscreen mode on and off for a webpage element.
 */
function toggleFullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (!isFullScreen) {
    document.getElementById("canvas").classList.add("fullscreen");
    document.getElementById("endscreen").classList.add("fullscreen");
    document.getElementById("mainheadline").classList.add("d-none");
    enterFullscreen(fullscreen);
    isFullScreen = true;
  } else {
    leaveFullscreen();
  }
}

/**
 * The function enters fullscreen mode for a given element using different methods depending on the
 * browser.
 * @param element - The HTML element that you want to display in fullscreen mode. This can be any valid
 * HTML element such as a video player, image gallery, or even the entire webpage.
 */
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

/**
 * The function exits full screen mode in a web browser.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener("fullscreenchange", fullscreenchangelog);

/**
 * The function checks if the document is in fullscreen mode and calls another function to exit
 * fullscreen if it is not.
 */
function fullscreenchangelog() {
  if (!document.fullscreenElement) {
    leaveFullscreen();
  }
}

// ---- Functions for audio ----

/**
 * The function toggles the sound on and off, saving the audio setting and updating the sound icon.
 */
function toggleSound() {
  muteAudioFiles(isSoundMuted);
  setSoundIcon();
  isSoundMuted = !isSoundMuted;
  saveAudioSetting();
}

/**
 * The function sets the sound icon based on whether the sound is muted or not.
 */
function setSoundIcon() {
  let soundicon = document.getElementById("soundicon");
  if (isSoundMuted) {
    soundicon.src = "./img/1_controls/muted.png";
  } else {
    soundicon.src = "./img/1_controls/loud.png";
  }
}

/**
 * The function saves the audio setting in local storage.
 */
function saveAudioSetting() {
  localStorage.setItem("isEPLSoundMuted", isSoundMuted);
}

/**
 * The function initializes the sound settings by checking the value of a variable in local storage and
 * setting a boolean variable accordingly.
 */
function initSoundSettings() {
  let initsound = localStorage.getItem("isEPLSoundMuted");
  if (initsound == "false") {
    isSoundMuted = true;
  }
  if (initsound == "true") {
    isSoundMuted = false;
  }
  if (initsound == null) {
    isSoundMuted = true;
  }
}

/**
 * The function loads and initializes sound settings, sets the sound icon, and toggles sound.
 */
function loadSoundSettings() {
  initSoundSettings();
  setSoundIcon();
  toggleSound();
}

/**
 * The function mutes or unmutes various audio files in a game world.
 * @param boolean - a boolean value (true or false) that determines whether the audio files should be
 * muted or not. If it is true, the audio files will be muted, and if it is false, the audio files will
 * be unmuted.
 */
function muteAudioFiles(boolean) {
  world.character.walking_sound.muted = boolean;
  world.character.hurt_sound.muted = boolean;
  world.character.dead_sound.muted = boolean;
  world.character.jump_sound.muted = boolean;
  world.chickenHurt_sound.muted = boolean;
  world.level.endboss[0].endbossDead_sound.muted = boolean;
  world.backgroundMusic.muted = boolean;
  for (let i = 0; i < world.level.collectableItems.length; i++) {
    world.level.collectableItems[i].collect_sound.muted = boolean;
  }
}

/**
 * The function removes the fullscreen class from certain elements and sets the isFullScreen variable
 * to false.
 */
function leaveFullscreen() {
  if (isFullScreen) {
    document.getElementById("canvas").classList.remove("fullscreen");
    document.getElementById("endscreen").classList.remove("fullscreen");
    document.getElementById("mainheadline").classList.remove("d-none");
    isFullScreen = false;
  }
}
