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
    private disableControl1: boolean;
    private disableControl2: boolean;
    private layer2: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super({ key: "Level" });
        this.controlsManager = new ControlsManager(this);
        this.disableControl1 = false;
        this.disableControl2 = false;
    }

    preload(): void {
        this.initAnims();
    }

    create(): void {
        this.cameras.main.setViewport(0, 96, 1024, 576);
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 1024, 576);
        this.initGround();
        this.initToys();
        this.initPlayers();
        this.initCursors();

        this.input.gamepad.on('down', (pad, button) => {
            if (button.index === 1) {
                if (!pad.index) {
                    // pad 1
                    if (!this.player1.hasToy) {
                        this.checkToy(this.player1);
                    } else {
                        this.throw(this.player1);
                    }
                } else {
                    // pad 2
                    if (!this.player2.hasToy) {
                        this.checkToy(this.player2);
                    } else {
                        this.throw(this.player2);
                    }
                }
            }
        });
    }

    initPlayers() {
        this.playersGroup = this.physics.add.group({ collideWorldBounds: true });
        this.player1 = new Character(this, 224, 288, 'jc', 0);
        this.player2 = new Character(this, 768, 288, 'mk', 1);
        this.playersGroup.add(this.player1, true);
        this.playersGroup.add(this.player2, true);
        this.physics.add.collider(this.player1, this.layer2);
        this.physics.add.collider(this.player2, this.layer2);
        this.player1.body.width = 52;
        this.player1.body.height = 82;
        this.player1.body.setOffset(0, 16);
        this.player2.body.width = 52;
        this.player2.body.height = 82;
        this.player2.body.setOffset(0, 16);
    }

    initToys() {
        this.toysGroup = this.physics.add.group();
        this.map.objects[0].objects.forEach(toyData => {
            let toy = new Toy(this, toyData.x + 16, toyData.y - 112, 'toy');
            this.toysGroup.add(toy, true);
        });
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
        if (!this.disableControl1) {
            if (!this.player1.hasToy) {
                pads[0] && pads[0].left ? this.player1.move(LEFT) : this.player1.stop(LEFT);
                pads[0] && pads[0].right ? this.player1.move(RIGHT) : this.player1.stop(RIGHT);
                pads[0] && pads[0].up ? this.player1.move(UP) : this.player1.stop(UP);
                pads[0] && pads[0].down ? this.player1.move(DOWN) : this.player1.stop(DOWN);
            } else {
                pads[0] && pads[0].left ? this.cursor1.move(LEFT) : this.cursor1.stop(LEFT);
                pads[0] && pads[0].right ? this.cursor1.move(RIGHT) : this.cursor1.stop(RIGHT);
                pads[0] && pads[0].up ? this.cursor1.move(UP) : this.cursor1.stop(UP);
                pads[0] && pads[0].down ? this.cursor1.move(DOWN) : this.cursor1.stop(DOWN);
                if (pads[0] && pads[0].A) this.cancelToy(this.player1);
            }
        }

        if (!this.disableControl2) {
            if (!this.player2.hasToy) {
                pads[1] && pads[1].left ? this.player2.move(LEFT) : this.player2.stop(LEFT);
                pads[1] && pads[1].right ? this.player2.move(RIGHT) : this.player2.stop(RIGHT);
                pads[1] && pads[1].up ? this.player2.move(UP) : this.player2.stop(UP);
                pads[1] && pads[1].down ? this.player2.move(DOWN) : this.player2.stop(DOWN);

            } else {
                pads[1] && pads[1].left ? this.cursor2.move(LEFT) : this.cursor2.stop(LEFT);
                pads[1] && pads[1].right ? this.cursor2.move(RIGHT) : this.cursor2.stop(RIGHT);
                pads[1] && pads[1].up ? this.cursor2.move(UP) : this.cursor2.stop(UP);
                pads[1] && pads[1].down ? this.cursor2.move(DOWN) : this.cursor2.stop(DOWN);
                if (pads[1] && pads[1].A) this.cancelToy(this.player2);
            }
        }
    }

    checkToy(player: Character) {
        this.physics.overlap(player, this.toysGroup, (player: Character, toy: Toy) => {
            player.hasToy = toy;

            if (player.numPlayer) {
                this.cursor2.setVisible(true);
            } else {
                this.cursor1.setVisible(true);
            }

            setTimeout(() => {
                player.anims.stop();
                player.setVelocity(0, 0);
            }, 50);
        });
    }

    cancelToy(player: Character) {
        player.hasToy = null;
        if (player.numPlayer) {
            this.cursor2.initPos();
            this.cursor2.hide();
        } else {
            this.cursor1.initPos();
            this.cursor1.hide();
        }
    }

    throw(player: Character) {
        let toy = player.hasToy;
        let cursor = null;
        if (player.numPlayer) {
            cursor = this.cursor2;
        } else {
            cursor = this.cursor1;
        }
        this.physics.overlap(cursor, this.layer2, (el: any, el2: any) => {
            if (!el2.collideDown && !el2.collideLeft && !el2.collideRight && !el2.collideUp && !this.physics.overlap(cursor, this.toysGroup)) {
                this.tweens.add({
                    targets: toy,
                    props: {
                        x: { value: cursor.x + 16, duration: 500, ease: 'Linear' },
                        y: { value: cursor.y + 16, duration: 500, ease: 'Expo.easeIn' }
                    },
                    onComplete: this.cancelToy(player)
                });
            }
        });
    }

    initGround() {

        let randomLevel = Math.floor(Math.random() * 17) + 1;
        this.map = this.add.tilemap('map' + randomLevel);
        let floor = this.map.addTilesetImage('meuble');
        this.layer = this.map.createStaticLayer(0, floor, 0, -96);
        let meubles = this.map.addTilesetImage('meuble');
        this.layer2 = this.map.createStaticLayer(1, meubles, 0, -96);
        this.layer2.setCollisionBetween(1, 61);

        // this.layer2.renderDebug(this.add.graphics(), {
        //     tileColor: null, // Non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        // });
    }

    initCursors() {
        this.cursorsGroup = this.physics.add.group();

        this.cursor1 = new Cursor(this, 768, 352, 'cursor', this.player1);
        this.cursorsGroup.add(this.cursor1, true);
        this.cursor2 = new Cursor(this, 224, 352, 'cursor', this.player2);
        this.cursorsGroup.add(this.cursor2, true);
        this.cursor1.setVisible(false);
        this.cursor2.setVisible(false);
        this.physics.add.collider(this.cursor2, this.layer2);
        this.physics.add.collider(this.cursor1, this.layer2);
    }

    initStaticElements() {
        this.staticElementsGroup = this.physics.add.staticGroup();
    }

    update() {
        this.updateControls();
    }

    getToys(): Phaser.Physics.Arcade.Group {
        return this.toysGroup;
    }

    restart() {
        this.scene.restart();
    }

    pause() {
        this.scene.pause();
    }
}
