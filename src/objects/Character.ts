import { UP, DOWN, LEFT, RIGHT } from "../utils/constants";
import { Toy } from "./Toy";

export class Character extends Phaser.Physics.Arcade.Sprite {

    public numPlayer: number;
    public hasToy: Toy | null;
    private inputs: Object = {}
    private DEFAULT_SPEED: number = 400;

    constructor(scene, x, y, texture, numPlayer) {
        super(scene, x, y, texture, 0);

        this.inputs[UP] = false;
        this.inputs[DOWN] = false;
        this.inputs[LEFT] = false;
        this.inputs[RIGHT] = false;
        this.hasToy = null;
        this.numPlayer = numPlayer;
    }

    public move(direction: string) {

        this.inputs[direction] = true;
        this._animate();
    }

    public stop(direction: string) {
        if (direction)
            this.inputs[direction] = false;
        this._animate();
    }

    public _animate() {
        for (let index in this.inputs) {
            if (this.inputs[index]) {
                this.anims.play(this.texture.key + '_' + index, true);
                switch (index) {
                    case UP:
                        this.setVelocityY(this.DEFAULT_SPEED * (-1));
                        break;

                    case DOWN:
                        if (this.body.y <= 528)
                            this.setVelocityY(this.DEFAULT_SPEED);
                        else
                            this.setVelocityY(0);
                        break;

                    case RIGHT:
                        if ((this.numPlayer === 0 && this.body.x <= 448) || this.numPlayer === 1)
                            this.setVelocityX(this.DEFAULT_SPEED);
                        else
                            this.setVelocityX(0);
                        break;

                    case LEFT:
                        if ((this.numPlayer === 1 && this.body.x >= 512) || this.numPlayer === 0)
                            this.setVelocityX(this.DEFAULT_SPEED * (-1));
                        else
                            this.setVelocityX(0);
                        break;
                }
            } else if (this.anims.currentAnim && this.anims.currentAnim.key === this.texture.key + '_' + index) {
                this.anims.stop();
                switch (index) {
                    case UP:
                        this.anims.restart();
                        this.anims.stop();
                        break;
                    case DOWN:
                        this.anims.restart();
                        this.anims.stop();
                        break;
                    case RIGHT:
                        this.anims.restart();
                        this.anims.stop();
                        break;
                    case LEFT:
                        this.anims.restart();
                        this.anims.stop();
                        break;
                }
            }

            switch (index) {
                case UP:
                    if (!this.inputs[index] && this.body.velocity.y < 0) {
                        this.setVelocityY(0);
                    }
                    break;

                case DOWN:
                    if (!this.inputs[index] && this.body.velocity.y > 0) {
                        this.setVelocityY(0);
                    }
                    break;

                case RIGHT:
                    if (!this.inputs[index] && this.body.velocity.x > 0) {
                        this.setVelocityX(0);
                    }
                    break;
                case LEFT:
                    if (!this.inputs[index] && this.body.velocity.x < 0) {
                        this.setVelocityX(0);
                    }
                    break;
            }
        }
    }
}