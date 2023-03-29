class Pepe extends MovableObject {
  x = 20;
  y = 130;
  height = 300;
  width = 150;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world; // damit kann der Charakter auf die Variablen der World zugreifen

  //TODO replace
  walking_sound = new Audio("audio/running_sand.wav");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.end_of_level_x
      ) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 75;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // WALK animation
        this.playWalkAnimation(this.IMAGES_WALKING);
      }
    }, 1500 / 60);
  }

  jump() {}
}
