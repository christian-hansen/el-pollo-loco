class MovableObject extends DrawableObject {
  framerate = 60;
  speed = 0.15;
  flippedGraphics = false;
  speedY = 0;
  acceleration = 1;
  ground;
  energy = 100;
  lastHit = 0;
  IMAGE_DEAD;
  isAlive = true;

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
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.ground;
    }
  }

  isJumping() {
      return this.y - this.ground < 0;
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
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.y + this.height > obj.y + obj.offset.top &&
      this.x + this.offset.left - obj.width / 2 <
      obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height
    );
  }

  isJumpedOn(obj) {
    return (
      this.y + this.height > obj.y + obj.offset.top &&
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

  isKilled() {
    this.isAlive = false;
    this.loadImage(this.IMAGE_DEAD); //TODO switches back to walkanimation
    this.speed = 0;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveDown(fallspeed) {
    this.y += fallspeed;
  }

  moveUp(fallspeed) {
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

  endGame() {
    setTimeout(() => {
      stopGame();
      setTimeout(() => {
        showEndScreen();
      }, 1000);
    }, 2500);
  }
}
