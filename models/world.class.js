class World {
  character = new Pepe();
  //TODO for Schleife
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", 719 * -1, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * -1, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * -1, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * -1, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 0, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 0, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 0, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 0, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 1, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 1, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 1, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 1, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 4, 0),
  ];
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }
  
  setWorld() {
    this.character.world = this;
  }

  draw() {
    //Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);

    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    if (object.otherDirection) {
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
