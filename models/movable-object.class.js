class MovableObject extends DrawableObject {
  currentImage = 0;
  framerate = 60;
  speed = 0.15;
  flippedGraphics = false;
  speedY = 0;
  acceleration = 1;
  ground;
  energy = 100;
  lastHit = 0;

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
      ;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
    timepassed = timepassed / 1000; // difference in seconds
    return timepassed < 1;

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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 15;
  }
}
