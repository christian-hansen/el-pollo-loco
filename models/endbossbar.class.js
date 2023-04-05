class EndBossBar extends StatusBar {
  x = 510;
  y = 0;
  IMAGES = [
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/0.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/20.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/40.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/60.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/80.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png"
  ];

  constructor() {
    super().loadImages(this.IMAGES);
    this.setPercentage(100);
  }

}
