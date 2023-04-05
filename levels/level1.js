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
const clouds = [];

//Collectable Items
const amountCollectableBottles = 8;
const amountCollectableCoins = 5;
const collectableObjects = [];

//Level Setup
const level1 = new Level(
  clouds,
  backgroundObjects,
  collectableObjects,
  enemies,
  endboss,
  amountCollectableBottles,
  amountCollectableCoins
);

function generateLevel() {
  generateBackground();
  generateClouds();
  generateCollectableItems();
  generateEnemies();
  generateEndboss();
}

function generateBackground() {
  for (let i = 0; i < levelLength; i++) {
    for (let j = 0; j < backgroundImg.length; j++) {
      if (j < 4) {
        backgroundObject = new BackgroundObject(backgroundImg[j],backgroundWidth * (i * 2 - 1),0);
      } else {
        backgroundObject = new BackgroundObject(backgroundImg[j],backgroundWidth * (i * 2), 0);
      }
      backgroundObjects.push(backgroundObject);
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
