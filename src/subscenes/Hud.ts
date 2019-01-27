import { Toy } from "../objects/Toy";

export class Hud extends Phaser.Scene {
    private lifeP1Group: Phaser.GameObjects.Group;
    private lifeP2Group: Phaser.GameObjects.Group;
    private momUi: Phaser.GameObjects.Image;
    private gameInProgress: boolean;
    private levelScene: any;

    constructor() {
        super({ key: "Hud" });
    }

    preload(): void {

    }

    create(): void {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(0, 0, 1024, 96);
        graphics.fillRect(0, 672, 1024, 96);
        let jauge = this.add.image(0, 0, 'jauge');
        jauge.setOrigin(0, 0);
        this.momUi = this.add.image(32, 50, 'momui');
        let noms = this.add.image(0, 672, 'noms');
        noms.setOrigin(0, 0);
        this.lifeP1Group = this.add.group();
        this.lifeP2Group = this.add.group();

        //this.newGame();
    }

    removeHeart(playerNum: number) {
        if (playerNum) {
            this.lifeP2Group.getChildren().pop().destroy();
        } else {
            this.lifeP1Group.getChildren().pop().destroy();
        }
        if (!this.lifeP1Group.getChildren() || !this.lifeP2Group.getChildren()) {
            this.endGame();
        }
    }

    startGame() {

    }

    newGame() {
        //this.levelScene.newGame();
        this.lifeP1Group.destroy(true);
        this.lifeP2Group.destroy(true);
        this.lifeP1Group = this.add.group();
        this.lifeP2Group = this.add.group();
        this.momUi.setPosition(32, 50);
        var i = 0;
        while (this.lifeP1Group.getLength() < 3) {
            this.lifeP1Group.add(this.add.image(250 + (35 * i), 720, 'heart'), true);
            i++;
        }
        i = 0;
        while (this.lifeP2Group.getLength() < 3) {
            this.lifeP2Group.add(this.add.image(770 + (35 * i), 720, 'heart'), true);
            i++;
        }
        this.gameInProgress = true;
    }

    checkVictory() {
        this.levelScene = this.scene.get('Level');
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
            this.newGame();
        } else if (scoreP1 > scoreP2) {
            this.removeHeart(0);
        } else {
            this.removeHeart(1);
        }
    }

    update() {
        if (this.gameInProgress) {
            if (this.momUi.x < 990) {
                this.momUi.setPosition(this.momUi.x + 1, this.momUi.y);
            } else {
                this.gameInProgress = false;
                this.checkVictory();
            }
        }
    }

    endGame() {

    }
}
