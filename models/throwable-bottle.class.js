class ThrowableBottle extends ThrowableObject {
  height = 75;
  width = 75;
  ground = 320;
  speedY = 20;
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.throw(direction);
  }

  /**
   * This function animates images by repeatedly calling the playAnimation function every 50
   * milliseconds.
   */
  animate() {
    setInterval(() => this.playAnimation(this.IMAGES_ROTATION), 50);
  }
}
