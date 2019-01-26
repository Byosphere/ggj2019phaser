import { Character } from "./Character";
import { UP, DOWN, LEFT, RIGHT } from "../utils/constants";

export class Cursor extends Phaser.Physics.Arcade.Sprite {

    private character: Character;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(scene, x, y, texture, character) {
        super(scene, x, y, texture);

        this.character = character;
        this.graphics = scene.add.graphics();
        this.setOrigin(0, 0);
    }

    public move(direction) {
        this.graphics.clear();
        switch (direction) {
            case UP:
                if (this.y > 0)
                    this.setPosition(this.x, this.y - 32);
                break;
            case DOWN:
                if (this.y < 544)
                    this.setPosition(this.x, this.y + 32);
                break;
            case LEFT:
                if ((this.character.numPlayer === 0 && this.x > 512) || (this.character.numPlayer === 1 && this.x > 0))
                    this.setPosition(this.x - 32, this.y);
                break;
            case RIGHT:
                if ((this.character.numPlayer === 0 && this.x < 986) || (this.character.numPlayer === 1 && this.x < 480))
                    this.setPosition(this.x + 32, this.y);
                break;
        }
        this.graphics.lineStyle(2, 0x00ff00, 0.1);
        this.graphics.lineBetween(this.character.x, this.character.y, this.x + 16, this.y + 16);
    }

    public stop(direction) {
        //
    }
}