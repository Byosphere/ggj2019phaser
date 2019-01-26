import { UP, DOWN, LEFT, RIGHT } from "../utils/constants";

export class Character extends Phaser.Physics.Arcade.Sprite {

    private inputs: Object = {}
    private DEFAULT_SPEED: number = 200;

    constructor(scene, x, y, texture, numPlayer) {
        super(scene, x, y, texture, 0);

        this.inputs[UP] = false;
        this.inputs[DOWN] = false;
        this.inputs[LEFT] = false;
        this.inputs[RIGHT] = false;
    }

    /**
	 * Déplace le héros dans la direction passée en paramètre (haut, bas, gauche, droite)
	 * @param {string} direction 
	 */
    public move(direction: string) {
        this.inputs[direction] = true;
        this._animate();
    }

    /**
	 * Méthode privée gérant les animations du déplacement du héros
	 */
    _animate() {
        for (let index in this.inputs) {
            if (this.inputs[index]) {
                switch (index) {
                    case UP:
                        this.setVelocityY(this.DEFAULT_SPEED * (-1));
                        break;

                    case DOWN:
                        this.setVelocityY(this.DEFAULT_SPEED);
                        break;

                    case RIGHT:
                        this.setVelocityX(this.DEFAULT_SPEED);
                        break;

                    case LEFT:
                        this.setVelocityX(this.DEFAULT_SPEED * (-1));
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