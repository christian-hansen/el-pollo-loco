class Level {
    enemies;
    clouds;
    backgroundObjects;
    end_of_level_x = 719*3;
    collectableItems;
    endboss;


    constructor(clouds, backgroundObjects, collectableItems, enemies, endboss){
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableItems = collectableItems;
        this.enemies = enemies;
        this.endboss = endboss;
    }

}