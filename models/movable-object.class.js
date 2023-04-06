class MovableObject extends DrawableObject {

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
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < this.ground;
  }

  //TODO
  // isColliding(obj) {
  //   return (
  //     this.x + this.width >= obj.x &&
  //     this.y + this.height > obj.y &&
  //     this.x < obj.x &&
  //     this.y < obj.y + obj.height
  //   );
  // }

  //TODO
  isColliding(obj) {
    // console.log("X width", this.x + this.width - this.offset.right, obj.x + obj.offset.left);
    // console.log(this.x + this.width - this.offset.right >= obj.x + obj.offset.left);
    // console.log("Y Height", this.y + this.height, obj.y + obj.offset.top);
    // console.log("Y Height", this.y + this.height - this.offset.bottom + 80 + 75, obj.y + obj.offset.top);
    // console.log(this.y + this.height > obj.y + obj.offset.top);
    // console.log("Y top", this.y + this.offset.top, obj.y + obj.height - obj.offset.bottom);
    // console.log(this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom);
    // console.log("X Left", this.x + this.offset.left, obj.x + obj.width - obj.offset.right);
    // console.log(this.x + this.offset.left < obj.x + obj.width - obj.offset.right);
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.y + this.height > obj.y + obj.offset.top && 
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height 
    );
  }

  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
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

  moveRight() {
    this.x += this.speed;
  }

  moveDown(fallspeed){
    this.y += fallspeed;
  }

  moveUp(fallspeed){
    this.y -= fallspeed;
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
