class ThrowableBottle extends ThrowableObject {
height = 75;
width = 75;
ground = 480;
speedY = 20
IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
];

constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.throw()
}

animate() {

  setStoppableInterval(() => this.playAnimation(this.IMAGES_ROTATION), 50);
  }
}
