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
  otherDirection = false;

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
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / this.framerate);
  }

  moveRight() {
    console.log("Moving right");
  }

  playWalkAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
