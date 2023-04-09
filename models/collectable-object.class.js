class CollectableObject extends DrawableObject {
collect_sound;

    constructor() {
        super();
      }


playAudio() {
    this.collect_sound.playbackRate = 1;
    this.collect_sound.pause();
}

playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


collectItem() {
    this.isCollected = true;
    this.collect_sound.playbackRate = 2;
    world.playSound(this.collect_sound);
    this.removeItem();
  }

}