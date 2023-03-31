class Coin extends CollectableObject {
  height = 175;
  width = 175;
  y = 245;
IMAGES = [
  'img/8_coin/coin_1.png',
  'img/8_coin/coin_2.png',
]
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1000;
        this.y = 245 - Math.random() * 200;
        this.collect_sound = new Audio("audio/running_sand.wav");
        this.animate();
        this.playAudio();
      }

      animate(){
        setInterval(() => (this.playAnimation(this.IMAGES)), 300)
      }

    }
