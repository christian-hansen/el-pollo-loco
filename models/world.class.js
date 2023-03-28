class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(), new Cloud()]
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

    //Draw Character to canvas
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    //Draw Enemies to canvas
    this.enemies.forEach(enemy => {
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
    });

    //Draw Clouds to canvas
    this.clouds.forEach(cloud => {
        this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height)
    });


    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
