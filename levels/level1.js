const levelLength = 4; // Defines the background width and amount of background elements, also the amount of enemies and collectable items;

// Enemy elements
const amountEndboss = 1;
const amountEnemies = levelLength;
const enemies = [];
const endboss = [];

//Background Elements
const backgroundImg = [
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer/2.png",
  "img/5_background/layers/2_second_layer/2.png",
  "img/5_background/layers/1_first_layer/2.png",
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer/1.png",
  "img/5_background/layers/2_second_layer/1.png",
  "img/5_background/layers/1_first_layer/1.png",
];
const backgroundObjects = [];
const amountClouds = levelLength;
const backgroundWidth = 719;
const end_of_level_x = backgroundWidth * (levelLength - 1)
const clouds = [];

//Collectable Items
const amountCollectableBottles = 10;
const amountCollectableCoins = 10;
const collectableObjects = [];

//Level Setup
const level1 = new Level(
  clouds,
  backgroundObjects,
  collectableObjects,
  enemies,
  endboss,
  amountCollectableBottles,
  amountCollectableCoins,
  end_of_level_x
);

function generateLevel() {
  generateBackground();
  generateClouds();
  generateCollectableItems();
  generateEnemies();
  generateEndboss();
}

function generateBackground() {
  let bgObject;
  for (let i = 0; i < levelLength; i++) {
    for (let j = 0; j < backgroundImg.length; j++) {
      let bgImage = backgroundImg[j]
      if (j < (backgroundImg.length / 2)) {
        bgWidth = backgroundWidth * (i * 2 - 1);
        bgObject = new BackgroundObject(bgImage, bgWidth, 0);
      } else {
        bgWidth = backgroundWidth * (i * 2);
        bgObject = new BackgroundObject(bgImage, bgWidth, 0);
      }
      backgroundObjects.push(bgObject);
    }
  }
}

function generateClouds() {
  for (let i = 0; i < amountClouds; i++) {
    let cloudLocation = backgroundWidth * (i + 1) - 500;
    let imageNumber = Math.round(Math.random()); // either 0 or 1
    let cloud = new Cloud(cloudLocation, imageNumber);
    clouds.push(cloud);
  }
}

function generateEndboss() {
  for (let i = 0; i < amountEndboss; i++) {
    let boss = new Endboss();
    endboss.push(boss);
  }
}

function generateEnemies() {
  for (let i = 0; i < amountEnemies; i++) {
    let enemylocation = (backgroundWidth - 300) * (i + 1);
    let chicken = new Chicken(enemylocation);
    let smallchicken = new Smallchicken(enemylocation);
    enemies.push(chicken, smallchicken);
  }
}

function generateCollectableItems() {
  generateCollectableCoins();
  generateCollectableBottles();
}

function generateCollectableCoins() {
  for (let i = 0; i < amountCollectableCoins; i++) {
    let location = (backgroundWidth - 550) * (i + 1);
    let coin = new Coin(location);
    collectableObjects.push(coin);
  }
}

function generateCollectableBottles() {
  for (let i = 0; i < amountCollectableBottles; i++) {
    let location = (backgroundWidth - 550) * (i + 1);
    let bottle = new Bottle(location);
    collectableObjects.push(bottle);
  }
}
