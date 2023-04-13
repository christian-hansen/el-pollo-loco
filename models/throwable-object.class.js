class ThrowableObject extends MovableObject {
  constructor() {
    super();
    this.throw();
    this.animate();
  }

  throw(direction) {
    this.applyGravity();

    if (direction === "right") {
      setInterval(() => {
        this.x += 5;
      }, 25);
    } else if (direction === "left") {
      setInterval(() => {
        this.x -= 5;
      }, 25);
    }
  }
}
