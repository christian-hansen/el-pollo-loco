class World {
  character = new Pepe();
  level;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = [
    new HealthBar(),
    new CoinBar(),
    new BottleBar(),
  ];
  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;
  endboss;
  backgroundMusic =  new Audio('audio/background.mp3');
  chickenHurt_sound = new Audio('audio/chickenouch.wav');
  gameWon = false;


  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.draw();
    this.setWorld();
    this.run();
    this.chickenHurt_sound.volume = 0.2;
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
this.playBackgroundMusic()
    setInterval(() => {
      this.checkEnemyCollision();
      this.checkEndbossCollision();
      this.checkEndbossBottleCollision();
    }, 100);
    setInterval(() => {
      this.checkCollection();
    }, 25);
    setInterval(() => {
      this.checkThrowObjects();
    }, 150);
  }

  // Enemy collion causes hit and reduces health bar
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isJumping() && this.character.isColliding(enemy)) {
        enemy.isKilled();
        world.playSound(this.chickenHurt_sound);
        this.character.bounceUp();
      }
      if (this.character.isColliding(enemy)) {
        this.character.hit(5);
        world.playSound(this.character.hurt_sound);
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  checkEndbossCollision() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit(20);
        world.playSound(this.character.hurt_sound);
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  checkEndbossBottleCollision() {
    this.throwableObjects.forEach((bottle) => {
      if (this.level.endboss[0].isColliding(bottle)) {
        world.playSound(this.chickenHurt_sound);
        this.level.endboss[0].hit(10);
        this.statusBar[3].setPercentage(this.level.endboss[0].energy);
      }
    });
  }

  // Enemy collion causes hit and reduces health bar
  checkCollection() {
    this.level.collectableItems.forEach((item) => {
      if (
        this.character.isColliding(item) &&
        item instanceof Bottle &&
        !item.isCollected
      ) {
        item.collectItem();
        this.collectedBottles++;
        this.statusBar[2].setPercentage(
          (this.collectedBottles / amountCollectableBottles) * 100
        );
      }
      if (
        this.character.isColliding(item) &&
        item instanceof Coin &&
        !item.isCollected
      ) {
        item.collectItem();
        this.collectedCoins++;
        this.statusBar[1].setPercentage(
          (this.collectedCoins / amountCollectableCoins) * 100
        );
      }
    });
  }

  //TODO Last throw is...
  checkThrowObjects() {
    if (this.keyboard.KEY_D && this.collectedBottles > 0) {
      let bottle = new ThrowableBottle(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBar[2].setPercentage((this.collectedBottles / 8) * 100);
    }
  }

  draw() {
    //Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableItems);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0); //Back
    // ---- Space for fixed objects -----
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);

    this.ctx.translate(-this.camera_x, 0); //Back

    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  //add arrays with single objects
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // add single object
  addToMap(object) {
    if (object.flippedGraphics) {
      this.flipImage(object);
    }
    object.draw(this.ctx);
    // object.drawFrame(this.ctx);
    // object.drawHitBox(this.ctx);

    if (object.flippedGraphics) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0); // Verschieben um die Breite des Element
    this.ctx.scale(-1, 1); // spiegeln
    object.x = object.x * -1; // x-Achse drehen
  }

  flipImageBack(object) {
    object.x = object.x * -1; // x-Achse drehen
    this.ctx.restore();
  }

  playSound(sound) {
    if (isSoundActive) {
      sound.play();
    }
  }

  playBackgroundMusic() {
      this.backgroundMusic.playbackRate = 1.2;
      this.backgroundMusic.volume = 0.2;
      this.backgroundMusic.play();
    }
}
