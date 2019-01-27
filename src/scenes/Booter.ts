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
        this.load.image('title', 'src/assets/teddys_throwing.png');
        this.load.spritesheet('loader', 'src/assets/ui/loader.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map1', 'src/assets/maps/map1.json');
        this.load.tilemapTiledJSON('map2', 'src/assets/maps/map2.json');
        this.load.tilemapTiledJSON('map3', 'src/assets/maps/map3.json');
        this.load.tilemapTiledJSON('map4', 'src/assets/maps/map4.json');
        this.load.tilemapTiledJSON('map5', 'src/assets/maps/map5.json');
        this.load.tilemapTiledJSON('map6', 'src/assets/maps/map6.json');
        this.load.tilemapTiledJSON('map7', 'src/assets/maps/map7.json');
        this.load.tilemapTiledJSON('map8', 'src/assets/maps/map8.json');
        this.load.tilemapTiledJSON('map9', 'src/assets/maps/map9.json');
        this.load.tilemapTiledJSON('map10', 'src/assets/maps/map10.json');
        this.load.tilemapTiledJSON('map11', 'src/assets/maps/map11.json');
        this.load.tilemapTiledJSON('map12', 'src/assets/maps/map12.json');
        this.load.tilemapTiledJSON('map13', 'src/assets/maps/map13.json');
        this.load.tilemapTiledJSON('map14', 'src/assets/maps/map14.json');
        this.load.tilemapTiledJSON('map15', 'src/assets/maps/map15.json');
        this.load.tilemapTiledJSON('map16', 'src/assets/maps/map16.json');
        this.load.tilemapTiledJSON('map17', 'src/assets/maps/map17.json');

        this.load.audio('theme', 'src/assets/audio/theme.wav');
        this.load.audio('mom2', 'src/assets/audio/mom2.mp3');
    }

    create(): void {
        this.scene.stop("Booter");
        this.scene.run("MainScene");
    }
}
