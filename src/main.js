let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 1080,
    autoCenter: true,
    scene: [Play, Puzzle1],
    physics : {
        default: 'arcade',
        arcade : {
            debug: false
        }
    },
}
// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard keys
let keyW, keyA, keyS, keyD, keySPACE, keyT;