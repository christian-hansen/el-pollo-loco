class World {
  character = new Pepe();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = [
    new HealthBar(),
    new CoinBar(),
    new BottleBar(),
    new EndBossBar(),
  ];
  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;
  endboss;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkCollection();
      this.checkThrowObjects();
    }, 200);
  }

  // Enemy collion causes hit and reduces health bar
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      // console.log(enemy); //TODO isColliding with offsets not working
      if (this.character.isCollidingEnemy(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  // Enemy collion causes hit and reduces health bar
  checkCollection() {
    this.level.collectableItems.forEach((item) => {
      if (this.character.isColliding(item) && item instanceof Bottle && !item.isCollected) {
        item.collectItem();
        this.collectedBottles++;
        this.statusBar[2].setPercentage(this.collectedBottles / 8 * 100);
      }
      if (this.character.isColliding(item) && item instanceof Coin && !item.isCollected) {
        item.collectItem();
        this.statusBar[1].setPercentage(this.collectedCoins / 4 * 100);
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.KEY_D && this.collectedBottles > 0) {
      let bottle = new ThrowableBottle(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBar[2].setPercentage(this.collectedBottles / 8 * 100);
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
    object.drawHitBox(this.ctx);

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

}

