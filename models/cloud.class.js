class Cloud extends MovableObject {
  height = 360;
  width = 600;
speed = 0.5;

  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = x + Math.random() * 100;
    this.y = 20 + Math.random() * 15;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
  }, 100);
}
}