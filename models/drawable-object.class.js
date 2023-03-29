class DrawableObject {
  x;
  y;
  img;
  height;
  width;
  imageCache = {}; //available images for this movable object

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Pepe || this instanceof Chicken || this instanceof Endboss) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
  }

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); //<img>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // img/2_character_pepe/2_walk/W-21.png
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
