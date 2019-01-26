import "phaser";
import { Booter } from "./scenes/Booter";

const config = {
    title: "ggj 2019",
    url: "http://phaser.io",
    version: "0.0.1",
    width: "1024",
    height: "768",
    parent: "game",
    scenes: [Booter]
}

let game = new Phaser.Game(config);

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
