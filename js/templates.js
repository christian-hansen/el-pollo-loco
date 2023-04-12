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
  
  function loadAllImages() {
    world.character.loadImages(world.character.IMAGES_DEAD);
    world.character.loadImages(world.character.IMAGES_IDLE);
    world.character.loadImages(world.character.IMAGES_WALKING);
    world.character.loadImages(world.character.IMAGES_JUMPING);
    world.character.loadImages(world.character.IMAGES_HURT);
    world.character.loadImages(world.character.IMAGES_LONGIDLE);
    world.statusbar[0].loadImages(world.statusbar[0].IMAGES);  
    world.statusbar[1].loadImages(world.statusbar[1].IMAGES);  
    world.statusbar[2].loadImages(world.statusbar[2].IMAGES);  
    world.statusbar[3].loadImages(world.statusbar[3].IMAGES);  
    world.level.enemies[0].loadImages(world.level.enemies[0].IMAGES_DEAD);
    world.level.enemies[0].loadImages(world.level.enemies[0].IMAGES_WALKING);
    world.level.enemies[1].loadImages(world.level.enemies[0].IMAGES_DEAD);
    world.level.enemies[1].loadImages(world.level.enemies[0].IMAGES_WALKING);
    world.level.endboss[0].loadImages(world.level.endboss[0].IMAGES_ALERT);
    world.level.endboss[0].loadImages(world.level.endboss[0].IMAGES_ATTACK);
    world.level.endboss[0].loadImages(world.level.endboss[0].IMAGES_DEAD);
    world.level.endboss[0].loadImages(world.level.endboss[0].IMAGES_HURT);
    world.level.endboss[0].loadImages(world.level.endboss[0].IMAGES_WALKING);
    world.level.clouds[0].loadImages(world.level.clouds[0].IMAGES);
    world.level.collectableItems[0].loadImages(world.level.collectableItems[0].IMAGES);
    world.level.collectableItems[10].loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    world.level.backgroundObjects[0].loadImage("img/5_background/layers/air.png");
    world.level.backgroundObjects[1].loadImage("img/5_background/layers/3_third_layer/2.png");
    world.level.backgroundObjects[2].loadImage("img/5_background/layers/2_second_layer/2.png");
    world.level.backgroundObjects[3].loadImage("img/5_background/layers/1_first_layer/2.png");
    world.level.backgroundObjects[4].loadImage("img/5_background/layers/air.png");
    world.level.backgroundObjects[5].loadImage("img/5_background/layers/3_third_layer/1.png");
    world.level.backgroundObjects[6].loadImage("img/5_background/layers/2_second_layer/1.png");
    world.level.backgroundObjects[7].loadImage("img/5_background/layers/1_first_layer/1.png");
   }