class World {
  character = new Pepe();
  level;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = [new HealthBar(), new CoinBar(), new BottleBar()];
  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;
  endboss;
  backgroundMusic = new Audio("audio/background.mp3");
  chickenHurt_sound = new Audio("audio/chickenouch.wav");
  gameWon = false;

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * The function sets the world and audio for a character in JavaScript.
   */
  setWorld() {
    this.character.world = this;
    this.setAudio();
  }

  /**
   * The function sets up intervals to check for collisions, character position, collection, and thrown
   * objects.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCharacterIsLeftOfEndboss();
    }, 100);
    setInterval(() => {
      this.checkCollection();
    }, 25);
    setInterval(() => {
      this.checkThrowObjects();
    }, 150);
  }

  /**
   * This function clears the canvas, translates the context, draws objects, adds objects to the map,
   * draws enemies, and repeats the process using requestAnimationFrame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjects();
    this.ctx.translate(-this.camera_x, 0);
    // ---- Space for fixed objects -----
    this.addObjectsToMap(this.statusBar);
    // ---- ----
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.drawEnemies();
    this.ctx.translate(-this.camera_x, 0);

    // "Draw" gets called on repeat
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * The function adds enemies and endboss objects to the game map.
   */
  drawEnemies() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
  }

  /**
   * The function adds various objects to a map.
   */
  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableItems);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * The function adds objects to a map.
   * @param objects - An array of objects that need to be added to a map. The function iterates through
   * each object in the array and adds it to the map using the `addToMap` method.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * The function adds an object to a map and flips its graphics if necessary.
   * @param object - The "object" parameter is an object that contains information about a graphic
   * element that needs to be added to a map. It likely has properties such as position, size, image
   * source, and possibly other attributes that are used to draw the element on the canvas. The
   * function checks if the object has a
   */
  addToMap(object) {
    if (object.flippedGraphics) {
      this.flipImage(object);
    }
    object.draw(this.ctx);

    if (object.flippedGraphics) {
      this.flipImageBack(object);
    }
  }

  /**
   * The flipImage function mirrors an object horizontally and updates its x-axis position accordingly.
   * @param object - The "object" parameter is likely an object that represents an image or graphic
   * element that is being drawn on a canvas. The function "flipImage" is likely a method of a larger
   * object that has a canvas context (this.ctx) and is used to flip the image horizontally by
   * translating the context by
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0); // move by width of object
    this.ctx.scale(-1, 1); // mirror
    object.x = object.x * -1; // turn x-axis
  }

  /**
   * The function flips an image back to its original orientation.
   * @param object - The "object" parameter in this code likely refers to an object or element on a
   * canvas that has been previously flipped horizontally using the "flipImage" function. This
   * function, "flipImageBack", is designed to undo that flip by restoring the canvas to its original
   * state. The "object" parameter
   */
  flipImageBack(object) {
    object.x = object.x * -1; // turn x-axis
    this.ctx.restore();
  }

  // ---- Enemy collion functions ----

  /**
   * The function checks for collisions between the player and enemies, endboss, and endboss bottles.
   */
  checkCollisions() {
    this.checkEnemyCollision();
    this.checkEndbossCollision();
    this.checkEndbossBottleCollision();
  }

  /**
   * The function checks for collisions between the player character and enemies in the game level and
   * handles the appropriate actions.
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.isJumpingOnEnemy(enemy)) {
        enemy.isKilled(enemy);
        this.character.bounceUp();
      }
      if (this.character.isColliding(enemy)) {
        this.hitCharacter(5);
      }
    });
  }

  /**
   * The function checks for collision between the character and the endboss in a game and reduces the
   * character's health if there is a collision.
   */
  checkEndbossCollision() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.hitCharacter(20);
      }
    });
  }

  /**
   * This function checks for collision between throwable objects and the endboss in a game and calls a
   * function to hit the endboss if a collision occurs.
   */
  checkEndbossBottleCollision() {
    this.throwableObjects.forEach((bottle) => {
      if (this.level.endboss[0].isColliding(bottle)) {
        this.hitEndboss(10);
      }
    });
  }

  /**
   * The function checks if the character is behind the endboss and hits the character with 100 damage
   * if true.
   */
  checkCharacterIsLeftOfEndboss() {
    if (this.isBehindEndboss()) {
      this.hitCharacter(100);
    }
  }

  // ---- Item collection functions ----

  /**
   * The function checks if the player can collect items in the level and collects them if possible.
   */
  checkCollection() {
    this.level.collectableItems.forEach((item) => {
      if (this.canCollectItem(item, Bottle)) {
        item.collectItem(item);
        this.collectBottle();
      }
      if (this.canCollectItem(item, Coin)) {
        item.collectItem(item);
        this.collectCoin();
      }
    });
  }

  /**
   * The function checks if a character can collect a specific item object.
   * @param item - The item parameter is a variable that represents an object in the game that the
   * character can collect.
   * @param Obj - The "Obj" parameter is a placeholder for the type of object that the "item" parameter
   * should be checked against. It is likely a class or constructor function for a specific type of
   * game object, such as a coin or power-up.
   * @returns The function `canCollectItem` is returning a boolean value. It will return `true` if the
   * character is colliding with the item, the item is an instance of the specified object, and the
   * item has not already been collected. Otherwise, it will return `false`.
   */
  canCollectItem(item, Obj) {
    return (this.character.isColliding(item) && item instanceof Obj && !item.isCollected);
  }

  /**
   * The function increments the number of collected bottles and updates the percentage of collected
   * bottles in the status bar.
   */
  collectBottle() {
    this.collectedBottles++;
    this.statusBar[2].setPercentage((this.collectedBottles / amountCollectableBottles) * 100);
  }

  /**
   * The function updates the percentage of collected coins in the status bar.
   */
  collectCoin() {
    this.collectedCoins++;
    this.statusBar[1].setPercentage(
      (this.collectedCoins / amountCollectableCoins) * 100
    );
  }

  /**
   * The function checks if a bottle is available and throws it in the direction the character is
   * facing.
   */
  checkThrowObjects() {
    if (this.isBottleAvailabe() && this.character.isLookingLeft()) {
      let bottle = new ThrowableBottle(this.character.x - 25, this.character.y + 100, "left");
      this.throwBottle(bottle);
    } else if (this.isBottleAvailabe()) {
      let bottle = new ThrowableBottle(this.character.x + 100, this.character.y + 100, "right");
      this.throwBottle(bottle);
    }
  }

  // ---- Sound functions ----
  /**
   * The function plays a sound if the sound is not muted.
   * @param sound - The sound parameter is a variable that represents an audio file or sound object
   * that can be played. It could be an instance of the HTML5 Audio object or any other sound library
   * object.
   */
  playSound(sound) {
    if (isSoundMuted) {
      sound.play();
    }
  }

  /**
   * The function sets the volume of a chicken hurt sound and plays background music.
   */
  setAudio() {
    this.chickenHurt_sound.volume = 0.2;
    this.playBackgroundMusic();
  }

  /**
   * The function sets the playback rate and volume of a background music and plays it.
   */
  playBackgroundMusic() {
    this.backgroundMusic.playbackRate = 1.2;
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.play();
  }

  // ---- Supporting functions ----
  /**
   * This function returns the index of a specified item in an array.
   * @param array - The array parameter is an array of elements in which we want to find the index of a
   * specific item.
   * @param item - The item parameter is the element that we want to find the index of in the array.
   * @returns The function `getIndexOfItem` is returning the index of the first occurrence of the
   * `item` parameter in the `array` parameter. If the `item` is not found in the `array`, the function
   * will return -1.
   */
  getIndexOfItem(array, item) {
    return array.indexOf(item, 0);
  }

  /**
   * The function checks if the character is jumping and colliding with an enemy.
   * @param enemy - The "enemy" parameter is likely an object representing an enemy character or
   * obstacle in a game. The function is checking if the main character is currently jumping and
   * colliding with the enemy, which could be used to determine if the player successfully defeated the
   * enemy or if they were hit and lost a life.
   * @returns The function `isJumpingOnEnemy` is returning a boolean value. It is checking if the
   * character is currently jumping and colliding with the enemy, and returning `true` if both
   * conditions are met, and `false` otherwise.
   */
  isJumpingOnEnemy(enemy) {
    return this.character.isJumping() && this.character.isColliding(enemy);
  }

  /**
   * The function checks if the "D" key is pressed and if there are collected bottles available.
   * @returns The function `isBottleAvailable()` is returning a boolean value. It will return `true` if
   * the `KEY_D` is pressed on the keyboard and the `collectedBottles` variable is greater than 0,
   * otherwise it will return `false`.
   */
  isBottleAvailabe() {
    return this.keyboard.KEY_D && this.collectedBottles > 0;
  }

  /**
   * The function checks if the character is behind the endboss in a game level.
   * @returns The function `isBehindEndboss()` is returning a boolean value. It is checking if the
   * x-coordinate of the endboss plus its width is less than the x-coordinate of the character plus its
   * width. If this condition is true, it means that the character is behind the endboss and the
   * function returns `true`. Otherwise, it returns `false`.
   */
  isBehindEndboss() {
    return (
      this.level.endboss[0].x + this.level.endboss[0].width <
      this.character.x + this.character.width
    );
  }

  /**
   * The function adds a bottle to a list of throwable objects, decreases the count of collected
   * bottles, and updates a status bar.
   * @param bottle - The "bottle" parameter is an object representing a bottle that can be thrown. It
   * is being passed as an argument to the "throwBottle" function.
   */
  throwBottle(bottle) {
    this.throwableObjects.push(bottle);
    this.collectedBottles--;
    this.statusBar[2].setPercentage((this.collectedBottles / 8) * 100);
  }

  /**
   * The function damages the end boss in a game and updates the status bar accordingly.
   * @param damage - The amount of damage that the player's attack will inflict on the end boss.
   */
  hitEndboss(damage) {
    this.playSound(this.chickenHurt_sound);
    this.level.endboss[0].hit(damage);
    this.statusBar[3].setPercentage(this.level.endboss[0].energy);
  }

  /**
   * The function damages a character, plays a sound, and updates the character's energy level on a
   * status bar.
   * @param damage - The amount of damage that the character will receive.
   */
  hitCharacter(damage) {
    this.character.hit(damage);
    this.playSound(this.character.hurt_sound);
    this.statusBar[0].setPercentage(this.character.energy);
  }
}
