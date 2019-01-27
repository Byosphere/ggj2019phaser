import "phaser";
import { Booter } from "./scenes/Booter";
import { Level } from "./subscenes/Level";
import { Hud } from "./subscenes/Hud";
import { MainScene } from "./scenes/MainScene";

let config = {
    title: "ggj 2019",
    url: "http://phaser.io",
    version: "0.0.1",
    width: 1024,
    height: 768,
    parent: "game",
    type: Phaser.AUTO,
    input: { gamepad: true },
    backgroundColor: '#392542',
    disableContextMenu: true,
    renderConfig: { antialias: true, pixelArt: true, roundPixel: true },
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [Booter, MainScene, Level, Hud]
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Phaser.Game(config);
});
