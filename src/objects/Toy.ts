export class Toy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setFrame(Math.floor(Math.random() * 5));
    }
}