import { ControlsManager } from "../utils/ControlsManager";
import { Character } from "../objects/Character";
import { UP, RIGHT, LEFT, DOWN } from "../utils/constants";
import { Toy } from "../objects/Toy";
import { Cursor } from "../objects/cursor";

export class Level extends Phaser.Scene {

    private map: any;
    private layer: Phaser.Tilemaps.StaticTilemapLayer;
    private staticElementsGroup: Phaser.Physics.Arcade.StaticGroup;
    private playersGroup: Phaser.Physics.Arcade.Group;
    private toysGroup: Phaser.Physics.Arcade.Group;
    private collisionGroup: Phaser.Physics.Arcade.Group;
    private cursorsGroup: Phaser.Physics.Arcade.Group;
    private phaserSprite: Phaser.GameObjects.Sprite;
    private controlsManager: ControlsManager;
    private player1: Character;
    private player2: Character;
    private cursor1: Cursor;
    private cursor2: Cursor;

    constructor() {
        super({ key: "Level" });
        this.controlsManager = new ControlsManager(this);
    }

    preload(): void {

    }

    create(): void {
        this.cameras.main.setViewport(0, 96, 1024, 576);
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 1024, 576);
        this.initGround();
        this.initAnims();
        this.initToys();
        this.initPlayers();
        this.initCursors();
    }

    initPlayers() {
        this.playersGroup = this.physics.add.group({ collideWorldBounds: true });
        this.player1 = new Character(this, 200, 200, 'jc', 0);
        this.player2 = new Character(this, 600, 200, 'mk', 1);
        this.playersGroup.add(this.player1, true);
        this.playersGroup.add(this.player2, true);
        this.physics.add.collider(this.player1, this.layer);
    }

    initToys() {
        this.toysGroup = this.physics.add.group();
        let test = new Toy(this, 600, 50, 'toy1');
        this.toysGroup.add(test, true);
        let test2 = new Toy(this, 50, 50, 'toy2');
        this.toysGroup.add(test2, true);
    }

    initAnims() {
        this.anims.create({
            key: 'jc_up',
            frames: this.anims.generateFrameNumbers('jc', { start: 12, end: 17 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jc_down',
            frames: this.anims.generateFrameNumbers('jc', { start: 18, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'jc_left',
            frames: this.anims.generateFrameNumbers('jc', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jc_right',
            frames: this.anims.generateFrameNumbers('jc', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'mk_up',
            frames: this.anims.generateFrameNumbers('mk', { start: 12, end: 17 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'mk_down',
            frames: this.anims.generateFrameNumbers('mk', { start: 18, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'mk_left',
            frames: this.anims.generateFrameNumbers('mk', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'mk_right',
            frames: this.anims.generateFrameNumbers('mk', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
    }

    updateControls() {
        let pads = this.input.gamepad.gamepads;
        if (!this.player1.hasToy) {
            pads[0] && pads[0].left ? this.player1.move(LEFT) : this.player1.stop(LEFT);
            pads[0] && pads[0].right ? this.player1.move(RIGHT) : this.player1.stop(RIGHT);
            pads[0] && pads[0].up ? this.player1.move(UP) : this.player1.stop(UP);
            pads[0] && pads[0].down ? this.player1.move(DOWN) : this.player1.stop(DOWN);
            if (pads[0] && pads[0].B) this.checkToy(this.player1);
        } else {
            pads[0] && pads[0].left ? this.cursor1.move(LEFT) : this.cursor1.stop(LEFT);
            pads[0] && pads[0].right ? this.cursor1.move(RIGHT) : this.cursor1.stop(RIGHT);
            pads[0] && pads[0].up ? this.cursor1.move(UP) : this.cursor1.stop(UP);
            pads[0] && pads[0].down ? this.cursor1.move(DOWN) : this.cursor1.stop(DOWN);
            if (pads[0] && pads[0].B) this.throw(this.player1);
        }

        if (!this.player2.hasToy) {
            pads[1] && pads[1].left ? this.player2.move(LEFT) : this.player2.stop(LEFT);
            pads[1] && pads[1].right ? this.player2.move(RIGHT) : this.player2.stop(RIGHT);
            pads[1] && pads[1].up ? this.player2.move(UP) : this.player2.stop(UP);
            pads[1] && pads[1].down ? this.player2.move(DOWN) : this.player2.stop(DOWN);
            if (pads[1] && pads[1].B) this.checkToy(this.player2);
        } else {
            pads[1] && pads[1].left ? this.cursor2.move(LEFT) : this.cursor2.stop(LEFT);
            pads[1] && pads[1].right ? this.cursor2.move(RIGHT) : this.cursor2.stop(RIGHT);
            pads[1] && pads[1].up ? this.cursor2.move(UP) : this.cursor2.stop(UP);
            pads[1] && pads[1].down ? this.cursor2.move(DOWN) : this.cursor2.stop(DOWN);
            if (pads[1] && pads[1].B) this.throw(this.player2);
        }
    }

    checkToy(player: Character) {
        this.physics.overlap(player, this.toysGroup, (player: Character, toy: Toy) => {
            player.hasToy = toy;

            setTimeout(() => {
                player.anims.stop();
            }, 100);

            if (player.numPlayer) {
                this.cursor2.setVisible(true);
            } else {
                this.cursor1.setVisible(true);
            }
        });
    }

    throw(player: Character) {
        let toy = player.hasToy;
        console.log(toy);
    }

    initGround() {
        this.map = this.add.tilemap('map1');
        let tileset = this.map.addTilesetImage('');
        this.layer = this.map.createStaticLayer(0, tileset, 0, 0);
        let chaises = this.map.createFromObjects('Objects', 7, { key: "chaise" });
        let coffres = this.map.createFromObjects('Objects', 8, { key: "coffre" });
        let commodes = this.map.createFromObjects('Objects', 9, { key: "commode" });
        let lits = this.map.createFromObjects('Objects', 10, { key: "lit" });
        let tables = this.map.createFromObjects('Objects', 11, { key: "table" });
        let tableChevet = this.map.createFromObjects('Objects', 12, { key: "table_chevet" });

        this.map.setCollisionBetween(7, 12, true);
    }

    initCursors() {
        this.cursorsGroup = this.physics.add.group();

        this.cursor1 = new Cursor(this, 768, 288, 'cursor', this.player1);
        this.cursorsGroup.add(this.cursor1, true);
        this.cursor2 = new Cursor(this, 224, 288, 'cursor', this.player2);
        this.cursorsGroup.add(this.cursor2, true);
        this.cursor1.setVisible(false);
        this.cursor2.setVisible(false);
    }

    initStaticElements() {
        this.staticElementsGroup = this.physics.add.staticGroup();
    }

    update() {
        this.updateControls();
    }
}
