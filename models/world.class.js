class World {
  character = new Pepe();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];

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
      this.checkThrowObjects();

    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach( (enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      };
    });
  }

  checkThrowObjects() {
    if (this.keyboard.KEY_D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    //Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    
    this.ctx.translate(-this.camera_x, 0); //Back
    // ---- Space for fixed objects -----
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0); 
    
    
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

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
