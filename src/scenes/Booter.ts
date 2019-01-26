export class Booter extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "Booter"
        });
    }

    preload(): void {
        this.load.image("logo", "./src/boilerplate/assets/phaser.png");
    }

    create(): void {
        this.phaserSprite = this.add.sprite(400, 300, "logo");
    }
}
