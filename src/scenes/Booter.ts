export class Booter extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "Booter", active: true });
    }

    preload(): void {
        this.load.crossOrigin = 'anonymous';

        this.load.spritesheet('jc', 'src/assets/players1.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('mk', 'src/assets/players2.png', { frameWidth: 64, frameHeight: 96 });
    }

    create(): void {
        this.scene.stop("Booter");
        this.scene.run("MainScene");
    }
}
