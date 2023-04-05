let amountEndboss = 1;


const clouds = [new Cloud(), new Cloud(), new Cloud()];
const backgroundObjects = [new BackgroundObject("img/5_background/layers/air.png", 719 * -1, 0),
new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * -1, 0),
new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * -1, 0),
new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * -1, 0),

new BackgroundObject("img/5_background/layers/air.png", 719 * 0, 0),
new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 0, 0),
new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 0, 0),
new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 0, 0),

new BackgroundObject("img/5_background/layers/air.png", 719 * 1, 0),
new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 1, 0),
new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 1, 0),
new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 1, 0),

new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),

new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),
new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),
new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
];
const collectableObjects = [new Coin(), new Coin(), new Coin(), new Coin(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];
const enemies = [
  new Chicken(), 
  new Smallchicken()
  ,new Chicken(), new Smallchicken(), new Smallchicken(), new Chicken()
  ];
let endboss = [];


const level1 = new Level(clouds,backgroundObjects,collectableObjects,enemies,endboss)

function generateBackground() {
  //
}
//TODO
function generateEndboss() {
for (let i = 0; i < amountEndboss; i++) {
  let boss = new Endboss();
  console.log(boss);
  endboss.push(boss);
}
}