import { ControlsManager } from "../utils/ControlsManager";
import { Character } from "../objects/Character";
import { UP, RIGHT, LEFT, DOWN } from "../utils/constants";

export class Level extends Phaser.Scene {

    private staticElementsGroup: Phaser.Physics.Arcade.StaticGroup;
    private playersGroup: Phaser.Physics.Arcade.Group;
    private phaserSprite: Phaser.GameObjects.Sprite;
    private controlsManager: ControlsManager;
    private player1: Phaser.Physics.Arcade.Sprite;
    private player2: Phaser.Physics.Arcade.Sprite;

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
        this.initPlayers();
        this.initAnims();
    }

    initPlayers() {
        this.playersGroup = this.physics.add.group({ collideWorldBounds: true });
        this.player1 = this.physics.add.sprite(200, 200, 'jc');
        this.player2 = this.physics.add.sprite(600, 200, 'mk');
        this.playersGroup.add(this.player1);
        this.playersGroup.add(this.player2);
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
        for (var i = 0; i < 2; i++) {
            var gamepad = pads[i];
            var statique = true;
            if (!gamepad) continue;

            if (gamepad.left) {
                statique = false;
                if (i && this.player2.body.x >= 512) {
                    this.player2.setVelocityX(-200);
                    this.player2.play('mk_left', true);
                } else if (i) {
                    this.player2.setVelocityX(0);
                } else {
                    this.player1.setVelocityX(-200);
                    this.player1.play('jc_left', true);
                }
            }

            if (gamepad.right) {
                statique = false;
                if (i) {
                    this.player2.setVelocityX(200);
                    this.player2.play('mk_right', true);
                } else if(this.player1.body.x <= 448) {
                    this.player1.setVelocityX(200);
                    this.player1.play('jc_right', true);
                } else {
                    this.player1.setVelocityX(0);
                }
            }

            if (gamepad.up) {
                statique = false;
                if (i) {
                    this.player2.setVelocityY(-200);
                    this.player2.play('mk_up', true);
                } else {
                    this.player1.setVelocityY(-200);
                    this.player1.play('jc_up', true);
                }
            }

            if (gamepad.down) {
                statique = false;
                if (i) {
                    this.player2.setVelocityY(200);
                    this.player2.play('mk_down', true);
                } else {
                    this.player1.setVelocityY(200);
                    this.player1.play('jc_down', true);
                }
            }
            if (statique) {
                if (i) {
                    this.player2.setVelocityX(0);
                    this.player2.setVelocityY(0);
                    this.player2.anims.stop();
                } else {
                    this.player1.setVelocityX(0);
                    this.player1.setVelocityY(0);
                    this.player1.anims.stop();
                }
            }
        }
    }

    initGround() {

    }

    initStaticElements() {
        this.staticElementsGroup = this.physics.add.staticGroup();
    }

    update() {
        this.updateControls();
    }
}
