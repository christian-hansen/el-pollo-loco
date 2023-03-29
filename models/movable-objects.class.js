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
