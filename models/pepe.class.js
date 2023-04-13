class Pepe extends MovableObject {
  x = 20;
  y = 128;
  acceleration = 2.2;
  ground = 128;
  height = 300;
  width = 150;
  speed = 7;
  offset = {
    top: 140,
    bottom: 160,
    left: 90,
    right: 40,
  };
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
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
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  world;
  walking_sound = new Audio("audio/running_sand.wav");
  hurt_sound = new Audio("audio/hurt.wav");
  dead_sound = new Audio("audio/ohno.wav");
  jump_sound = new Audio("audio/jump.wav");

  constructor() {
    super().loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.applyGravity();
    this.animate();
    this.walking_sound.playbackRate = 2;
    this.hurt_sound.playbackRate = 2;
    this.dead_sound.playbackRate = 0.2;
    this.hurt_sound.volume = 0.3;
    this.dead_sound.volume = 0.3;
  }

  /**
   * The function sets two intervals to move and play animations for a character.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacterAnimations(), 8000 / 60);
  }

  /**
   * The function moves a character in a game world and handles sound effects.
   */
  moveCharacter() {
    this.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      world.playSound(this.jump_sound);
      this.jump();
    }
    this.world.camera_x = -this.x + 75;
  }

  /**
   * The function plays different animations based on the character's state in the game.
   */
  playCharacterAnimations() {
    if (this.isDead()) {
      this.playDyingAnimation();
      this.hurt_sound.pause();
      world.playSound(this.dead_sound);
      this.endGame();
    } else if (this.isHurt()) {
      this.hurt_sound.pause();
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.isMoving()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.y = this.ground;
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  // ---- Start movement functions ----

  /**
   * The function checks if the right arrow key is pressed and if the character's position is less than
   * the end of the level.
   * @returns The function `canMoveRight()` is returning a boolean value. It is checking if the right
   * arrow key is being pressed (`this.world.keyboard.KEY_RIGHT`) and if the current x position of the
   * object is less than the end of the level x position (`this.x < this.world.level.end_of_level_x`).
   * If both conditions are true, it will return `true`, indicating that the object can move
   */
  canMoveRight() {
    return (
      this.world.keyboard.KEY_RIGHT && this.x < this.world.level.end_of_level_x
    );
  }

  moveRight() {
    /**
     * The function moves an object to the right and plays a sound if it is not above ground.
     */
    super.moveRight();
    if (!this.isAboveGround()) world.playSound(this.walking_sound);
    this.flippedGraphics = false;
  }

  /**
   * The function checks if the left arrow key is pressed and if the object's x position is greater
   * than 0.
   * @returns The function `canMoveLeft()` is returning a boolean value. It will return `true` if the
   * left arrow key is pressed and the x-coordinate of the object is greater than 0, indicating that it
   * can move to the left. Otherwise, it will return `false`.
   */
  canMoveLeft() {
    return this.world.keyboard.KEY_LEFT && this.x > 0;
  }

  /**
   * The function moves an object to the left, plays a sound if it's not above ground, and flips its
   * graphics.
   */
  moveLeft() {
    super.moveLeft();
    if (!this.isAboveGround()) world.playSound(this.walking_sound);
    this.flippedGraphics = true;
  }

  /**
   * The function returns a boolean value indicating whether the graphics are flipped to the left or
   * not.
   * @returns the value of the property `flippedGraphics`.
   */
  isLookingLeft() {
    return this.flippedGraphics;
  }

  /**
   * The function checks if the player is moving left or right using keyboard input.
   * @returns The function `isMoving()` is returning a boolean value. It will return `true` if either
   * the `KEY_RIGHT` or `KEY_LEFT` key is currently being pressed on the keyboard, and `false`
   * otherwise.
   */
  isMoving() {
    return this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT;
  }

  /**
   * The function checks if the space key is pressed and the character is not above the ground to
   * determine if it can jump.
   * @returns The function `canJump()` is returning a boolean value. It is checking if the space key is
   * pressed on the keyboard and if the character is not currently above the ground. If both conditions
   * are true, it will return `true`, otherwise it will return `false`.
   */
  canJump() {
    return this.world.keyboard.KEY_SPACE && !this.isAboveGround();
  }

  /**
   * The function plays a dying animation by displaying a sequence of images and moving the object up
   * and down.
   */
  playDyingAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.moveUp(30);
      setTimeout(() => {
        this.moveDown(150);
      }, 1000);
    }, 1000);
  }
}
