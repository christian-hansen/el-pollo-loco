class World {
  character = new Pepe();
  level = level1;

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

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

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
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
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
