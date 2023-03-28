class Cloud extends MovableObject {
  y = 30;
  height = 360;
  width = 600;


  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = 50;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
