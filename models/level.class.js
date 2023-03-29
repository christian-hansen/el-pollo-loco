class Level {
    enemies;
    clouds;
    backgroundObjects;
    end_of_level_x = 719*3;

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }

}