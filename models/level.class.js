class Level {
    enemies;
    clouds;
    backgroundObjects;
    end_of_level_x = 719*3;
    collectableItems;


    constructor(enemies, clouds, backgroundObjects, collectableItems){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableItems = collectableItems;
    }

}