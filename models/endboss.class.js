class Endboss extends MovableObject {
  y = 135;
  height = 300;
  width = 280;
  offset = {
    top: 50,
    bottom: 65,
    left: 30,
    right: 20,
  };
  world;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  endbossDead_sound = new Audio("audio/win.wav");
  hadFirstHit = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = end_of_level_x + 250;
    this.speed = 10;

    this.animate();
  }

  /**
   * The function animates the endboss character and displays its health bar when the player character
   * comes within a certain distance.
   */
  animate() {
    let i;
    let hadFirstContact = false;
    let endbossHealthbar = new EndBossBar();
    

    setInterval(() => {
      if (world.character.x > this.x - 500 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
        world.statusBar.push(endbossHealthbar);
      }
      this.playEndbossAnimationLoop(i);
      if (i === 65) {
        i = 25; // resets endboss' alert/attack animation loop
      }
      i++;
    }, 100);
  }

  /**
   * The function checks if the endboss is dead or hurt and plays the appropriate sound or animation.
   */
  playEndbossGotHit() {
    if (this.isDead()) {
      world.playSound(this.endbossDead_sound);
      this.playEndbossDying();
      world.gameWon = true;
      this.endGame();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * The function plays different animations for an end boss character based on the value of the input
   * parameter.
   * @param i - The parameter "i" is a number that is used to determine which animation to play in the
   * "playEndbossAnimationLoop" function. It is likely used as a counter or timer to control the timing
   * and sequence of the different animations.
   */
  playEndbossAnimationLoop(i) {
    if (this.hadFirstHit) {
      this.playEndbossAttack();
    } else if (i < 25) {
      this.playEndBossWalk();
    } else if (i > 25 && i < 45) {
      this.playEndbossAlert();
    } else if (i > 45) {
      this.playEndbossAttack();
    }
  }

  /**
   * The function plays an animation of the end boss dying and moves it down by 30 units.
   */
  playEndbossDying() {
    this.playAnimation(this.IMAGES_DEAD);
    this.moveDown(30);
  }

  /**
   * The function makes the end boss character move left, play a walking animation, and trigger a "got
   * hit" animation.
   */
  playEndBossWalk() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
    this.playEndbossGotHit();
  }

  /**
   * The function plays an animation and triggers the "endboss got hit" event.
   */
  playEndbossAlert() {
    this.playAnimation(this.IMAGES_ALERT);
    this.playEndbossGotHit();
  }

  /**
   * The function makes the endboss move left, play an attack animation, and then play a got hit
   * animation.
   */
  playEndbossAttack() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_ATTACK);
    this.playEndbossGotHit();
  }
}
