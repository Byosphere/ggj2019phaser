export class ControlsManager {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    // PLAYER 1
    public player1_UP(callback: Function) {
        this.scene.input.keyboard.on('keydown_UP', () => {
            callback();
        }, this.scene);
    }

    public player1_DOWN(callback: Function) {

    }

    public player1_RIGHT(callback: Function) {
        this.scene.input.keyboard.on('keydown_RIGHT', () => {
            callback();
        }, this.scene);
    }

    public player1_LEFT(callback: Function) {
        this.scene.input.keyboard.on('keydown_LEFT', () => {
            callback();
        }, this.scene);
    }

    public player1_VALID(callback: Function) {
        this.scene.input.keyboard.on('keydown_A', () => {
            callback();
        }, this.scene);
    }

    public player1_CANCEL(callback: Function) {
        this.scene.input.keyboard.on('keydown_E', () => {
            callback();
        }, this.scene);
    }

    // PLAYER 2
    public player2_UP(callback: Function) {

    }

    public player2_DOWN(callback: Function) {

    }

    public player2_RIGHT(callback: Function) {

    }

    public player2_LEFT(callback: Function) {

    }

    public player2_VALID(callback: Function) {

    }

    public player2_CANCEL(callback: Function) {

    }
}