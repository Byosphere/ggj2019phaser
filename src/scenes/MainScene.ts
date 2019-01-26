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
        this.scene.run('Hud');
        this.scene.run('Level');
    }

    update(): void {

    }
}
