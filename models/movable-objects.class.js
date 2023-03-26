class MovableObject {
    x = 120;
    y = 400;
    img;

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); //<img>
        this.img.src = path;
    }

    moveLeft() {
    }

    moveRight(){
        console.log("Moving right");
    }
}