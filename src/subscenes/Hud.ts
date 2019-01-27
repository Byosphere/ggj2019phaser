import { Toy } from "../objects/Toy";

export class Hud extends Phaser.Scene {
    private lifeP1Group: Phaser.GameObjects.Image[];
    private lifeP2Group: Phaser.GameObjects.Image[];
    private momUi: Phaser.GameObjects.Image;
    private gameInProgress: boolean;
    private levelScene: any;
    private cover: Phaser.GameObjects.Graphics;
    private popup: Phaser.GameObjects.Sprite;
    private popupDisplay: number = 0;
    private disableControls: boolean = false;
    private mom: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "Hud" });
    }

    preload(): void {

    }

    create() {
        this.levelScene = this.scene.get('Level');

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(0, 0, 1024, 96);
        graphics.fillRect(0, 672, 1024, 96);

        let jauge = this.add.image(0, 0, 'jauge');
        jauge.setOrigin(0, 0);
        this.momUi = this.add.image(32, 50, 'momui');
        let noms = this.add.image(0, 672, 'noms');
        noms.setOrigin(0, 0);
        this.lifeP1Group = [];
        this.lifeP2Group = [];

        this.mom = this.add.sprite(512, 176, 'mom');
        this.initMomAnims();

        this.cover = this.add.graphics();
        this.cover.fillStyle(0x000000, 0.7);
        this.cover.fillRect(0, 0, 1024, 768);

        this.popup = this.add.sprite(512, 384, 'popup', 0);

        this.initGame();

        this.input.gamepad.on('down', (pad, button) => {
            if (!this.gameInProgress && !this.disableControls) {

                if (this.popupDisplay < 3) {
                    if (button.index === 1) {
                        this.popupDisplay++;
                        this.popup.setFrame(this.popupDisplay);
                        if (this.popupDisplay === 3) this.startGame();
                    }
                } else if (this.popupDisplay >= 5) {
                    if (this.popupDisplay === 6 || this.popupDisplay === 8) this.endGame();
                    this.popupDisplay++;
                    this.popup.setFrame(this.popupDisplay);
                } else {
                    if (button.index === 1) {
                        this.startGame();
                    }
                }
            }
        });
    }

    removeHeart(playerNum: number) {
        if (playerNum === 1) {
            this.lifeP2Group.pop().destroy();
            this.pauseGame(playerNum);
        } else if (playerNum === 0) {
            this.lifeP1Group.pop().destroy();
            this.pauseGame(playerNum);
        } else {
            this.lifeP2Group.pop().destroy();
            this.lifeP1Group.pop().destroy();
            this.pauseGame(playerNum);
        }
    }

    pauseGame(winner: number): any {
        //this.levelScene.pause();
        this.disableControls = false;
        if (!this.lifeP1Group.length || !this.lifeP2Group.length) {
            this.popupDisplay = winner ? 5 : 7;
            this.popup.setFrame(this.popupDisplay);
            this.popup.setVisible(true);
            this.cover.setVisible(true);
        } else {
            if (winner === -1) this.popup.setFrame(9);
            if (winner === 0) this.popup.setFrame(3);
            if (winner === 1) this.popup.setFrame(4);
            this.popup.setVisible(true);
            this.cover.setVisible(true);
        }
    }

    startGame() {
        this.popup.setVisible(false);
        this.cover.setVisible(false);
        this.newGame();
    }

    newGame() {
        this.levelScene.restart();
        this.momUi.setPosition(32, 50);
        this.gameInProgress = true;
    }

    checkVictory() {
        let toysGroup: Phaser.Physics.Arcade.Group = this.levelScene.getToys();
        let scoreP1 = 0;
        let scoreP2 = 0;
        toysGroup.getChildren().forEach((toy: Toy) => {
            if (toy.x > 512) {
                scoreP2++;
            } else {
                scoreP1++;
            }
        });
        if (scoreP1 === scoreP2) {
            this.animMom(-1)
        } else if (scoreP1 > scoreP2) {
            this.animMom(0);
        } else {
            this.animMom(1);
        }
    }

    animMom(victim: number) {
        this.levelScene.pause();
        let animNum = 0;
        this.mom.on('animationcomplete', () => {
            switch (animNum) {
                case 0:
                    if (victim === -1) {
                        animNum = 2;
                        setTimeout(() => {
                            this.mom.anims.play('mom_exit');
                        }, 500);
                    } else if (victim === 0) {
                        animNum++;
                        setTimeout(() => {
                            this.mom.anims.play('mom_left');
                        }, 500);
                    } else if (victim === 1) {
                        animNum++;
                        setTimeout(() => {
                            this.mom.anims.play('mom_right');
                        }, 500);
                    }
                    break;
                case 1:
                    animNum++;
                    setTimeout(() => {
                        this.mom.anims.play('mom_exit');
                    }, 500);
                    break;
                case 2:
                    this.mom.removeAllListeners('animationcomplete');
                    this.removeHeart(victim);
                    break;
            }
        }, this);
        this.mom.anims.play('mom_open');
    }

    update() {
        if (this.gameInProgress) {
            if (this.momUi.x < 990) {
                this.momUi.setPosition(this.momUi.x + 1, this.momUi.y);
            } else {
                this.gameInProgress = false;
                this.disableControls = true;
                this.checkVictory();
            }
        }
    }

    initGame() {
        this.popupDisplay = 0;

        var i = 0;
        while (this.lifeP1Group.length < 3) {
            this.lifeP1Group.push(this.add.image(250 + (35 * i), 720, 'heart'));
            i++;
        }
        i = 0;
        while (this.lifeP2Group.length < 3) {
            this.lifeP2Group.push(this.add.image(770 + (35 * i), 720, 'heart'));
            i++;
        }
        this.popup.setVisible(true);
        this.cover.setVisible(true);
        this.momUi.setPosition(32, 50);
    }

    endGame() {
        console.log('endgame');
        this.initGame();
    }

    initMomAnims() {
        this.anims.create({
            key: 'mom_open',
            frames: this.anims.generateFrameNumbers('mom', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: 'mom_left',
            frames: this.anims.generateFrameNumbers('mom', { start: 12, end: 28 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'mom_right',
            frames: this.anims.generateFrameNumbers('mom', { start: 29, end: 45 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'mom_exit',
            frames: this.anims.generateFrameNumbers('mom', { start: 46, end: 51 }),
            frameRate: 15,
            repeat: 0
        });
    }
}
