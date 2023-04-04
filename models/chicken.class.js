class Chicken extends MovableObject {
  y = 338;
  height = 80;
  width = 80;
  offset = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 5,
  }
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  animate() {
    
    setInterval(() => this.moveLeft(), 1000/60);
    
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
  }
}
