// Templates and supporting functions 
function renderRandomGameOverScreen() {
    let endScreenClass;
    if (isFullScreen) {
      endScreenClass = "fullendscreen";
    } else {
      endScreenClass = "defaultendscreen";
    }
    let max = gameOverScreens.length - 1;
    let randomScreen = Math.floor(Math.random() * (max - + 1));
    return `<img src="${gameOverScreens[randomScreen]}" class="${endScreenClass}"></img>
    <div class="button flex-center" onclick="reloadGame()">Back to Start</div>`;
  }
  
  function renderGameWonScreen() {
    let endScreenClass;
    if (isFullScreen) {
      endScreenClass = "fullendscreen";
    } else {
      endScreenClass = "defaultendscreen";
    }
    return `<img src="img/9_intro_outro_screens/game_over/gamewon2.png" class= ${endScreenClass}></img>
    <div class="button flex-center" onclick="reloadGame()">Back to Start</div>`;
  }