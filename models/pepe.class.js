class Pepe extends MovableObject {
  x = 20;
  y = 125;
  ground = 125;
  height = 300;
  width = 150;
  speed = 5;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  world; // damit kann der Charakter auf die Variablen der World zugreifen

  //TODO replace
  walking_sound = new Audio("audio/running_sand.wav");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.end_of_level_x) {
        this.moveRight();
        this.walking_sound.play();
        this.flippedGraphics = false;
      }
      if (this.world.keyboard.KEY_LEFT && this.x > 0) {
        this.moveLeft()
        this.walking_sound.play();
        this.flippedGraphics = true;
      }
      if (this.world.keyboard.KEY_SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 75;
    }, 1200 / 60);

    setInterval(() => {

      if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }
      else if(this.isHurt()){
        this.playAnimation(this.IMAGES_HURT);
      }
      else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } 
      else if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
        // WALK animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 8000 / 60);
  }
}
