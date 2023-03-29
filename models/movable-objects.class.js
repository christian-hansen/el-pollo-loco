class MovableObject {
  x;
  y;
  img;
  height;
  width;
  framerate = 60;
  imageCache = {}; //available images for this movable object
  currentImage = 0;
  speed = 0.15;
  flippedGraphics = false;
  speedY = 0;
  acceleration = 1;
  ground;
  energy = 100;

  //Gravitation
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.ground;
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

  isColliding(obj) {
    return this.x + this.width >= obj.x &&
    this.y + this.height > obj.y &&
    this.x < obj.x &&
    this.y < obj.y + obj.height;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  moveLeft() {
      this.x -= this.speed;
  }

  moveRight(){
    this.x += this.speed;

  }

  playWalkAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 15;
  }
}
