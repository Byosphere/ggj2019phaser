export class Hud extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({key: "Hud"});
    }

    preload(): void {
        
    }

    create(): void {
        let graphics = this.add.graphics();
        graphics.fillStyle(0xFF3300, 1);
        graphics.fillRect(0,0, 1024, 96);
        graphics.fillRect(0,672, 1024, 96);
    }
}
