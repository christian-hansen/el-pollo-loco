class MovableObject {
  x;
  y;
  img;
  height;
  width;

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); //<img>
    this.img.src = path;
  }

  moveLeft() {}

  moveRight() {
    console.log("Moving right");
  }
}
