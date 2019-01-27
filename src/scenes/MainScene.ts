import { ControlsManager } from "../utils/ControlsManager";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;
    private controlsManager: ControlsManager;

    constructor() {
        super({ key: "MainScene" });
        this.controlsManager = new ControlsManager(this);
    }

    preload(): void {

    }

    create(): void {
        let image = this.add.image(512, 384, 'title');
        let loader = this.add.sprite(512, 560, 'loader');

        this.anims.create({
            key: 'loading',
            frames: this.anims.generateFrameNumbers('loader', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        loader.anims.play('loading');

        setTimeout(() => {
            image.setVisible(false);
            loader.setVisible(false);
            this.start();
        }, 4000);
    }

    start() {
        this.scene.run('Hud');
        this.scene.run('Level');
        this.scene.pause('Level');
    }

    update() {

    }
}
