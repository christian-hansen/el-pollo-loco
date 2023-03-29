class ThrowableObject extends MovableObject {

height = 75;
width = 75;
ground = 480;

  constructor(x, y) {
    super()
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw()
  }

  throw () {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 5;
    }, 25)

    // if (this.isAboveGround() || this.speedY > 0) {
    // setInterval(() => {
    //   this.x += 10;
    // }, 50);}
    // else {
    //   this.x += 0;
    // }
  }
}
