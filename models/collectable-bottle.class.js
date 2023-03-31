class Bottle extends CollectableObject {
  height = 75;
  width = 75;
  y = 345;

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
        this.x = 200 + Math.random() * 1000;
        this.collect_sound = new Audio("audio/running_sand.wav");
        this.playAudio();
      }
}