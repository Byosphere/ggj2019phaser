export class Booter extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "Booter", active: true });
    }

    preload(): void {
        this.load.crossOrigin = 'anonymous';

        this.load.spritesheet('jc', 'src/assets/players1.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('mk', 'src/assets/players2.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('popup', 'src/assets/ui/onboarding.png', { frameWidth: 384, frameHeight: 256 });
        this.load.spritesheet('mom', 'src/assets/mom.png', { frameWidth: 128, frameHeight: 160 });
        this.load.spritesheet('toy', 'src/assets/peluches.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('table', 'src/assets/table.png');
        this.load.image('chaise', 'src/assets/chaise.png');
        this.load.image('table_chevet', 'src/assets/table_chevet.png');
        this.load.image('lit', 'src/assets/lit.png');
        this.load.image('commode', 'src/assets/commode.png');
        this.load.image('coffre', 'src/assets/coffre.png');
        this.load.image('cursor', 'src/assets/cursor.png');
        this.load.image('momui', 'src/assets/ui/momUI.png');
        this.load.image('jauge', 'src/assets/ui/timer.png');
        this.load.image('noms', 'src/assets/ui/nom.png');
        this.load.image('meuble', 'src/assets/maps/meuble.png');
        this.load.image('heart', 'src/assets/ui/coeur.png');
        this.load.tilemapTiledJSON('map1', 'src/assets/maps/map1.json');
    }

    create(): void {
        this.scene.stop("Booter");
        this.scene.run("MainScene");
    }
}
