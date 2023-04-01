class Bottle extends CollectableObject {
  height = 75;
  width = 75;
  y = 345;
  collect_sound = new Audio("audio/collect_bottle.wav");

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
        this.x = 200 + Math.random() * 1000;
      }
}