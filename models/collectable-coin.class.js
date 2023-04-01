class Coin extends CollectableObject {
  height = 175;
  width = 175;
  y = 245;
  collect_sound = new Audio("audio/collect_coin.wav");

IMAGES = [
  'img/8_coin/coin_1.png',
  'img/8_coin/coin_2.png',
]
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1000;
        this.y = 245 - Math.random() * 200;
        this.animate();
      }

      animate(){
        setInterval(() => (this.playAnimation(this.IMAGES)), 300)
      }

    }
