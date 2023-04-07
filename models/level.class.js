class Level {
    enemies;
    clouds;
    backgroundObjects;
    end_of_level_x = 719*3;
    collectableItems;
    endboss;
    amountCollectableBottles;
    amountCollectableCoins;

    constructor(clouds, backgroundObjects, collectableItems, enemies, endboss,amountCollectableBottles,amountCollectableCoins){
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableItems = collectableItems;
        this.enemies = enemies;
        this.endboss = endboss;
        this.amountCollectableBottles = amountCollectableBottles;
        this.amountCollectableCoins = amountCollectableCoins;
    }

}