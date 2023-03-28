class World {
  character = new Pepe();
  backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png', 0 , 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0 , 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0 , 0), 
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0 , 0), 
  ];
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()]
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    //Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects)
    this.addObjectsToMap(this.clouds)
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies)


    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o)
    });
  }

  addToMap(object) {
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height)
  }

}
