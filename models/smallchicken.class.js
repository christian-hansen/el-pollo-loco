class Smallchicken extends MovableObject {
  y = 355;
  height = 60;
  width = 60;
  offset = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 5,
  }
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(x) {
    super().loadImages(this.IMAGES_WALKING);

    this.x = x + Math.random() * 400;
    this.speed = 0.15 + Math.random() * 0.3;

    this.animate();
  }

  animate() {
    
    setInterval(() => this.moveLeft(), 1000/60);
    
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
  }
}
