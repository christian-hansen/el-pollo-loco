class ThrowableObject extends MovableObject {
  constructor() {
    super();
    this.throw();
    this.animate();
  }

  throw() {
    this.applyGravity();

    setInterval(() => {
      this.x += 5;
    }, 25);
  }
}
