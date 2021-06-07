
let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 1080,
    autoCenter: true,
    physics: {
        default:"arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Menu, Play, Puzzle1, Puzzle2, Puzzle3, Puzzle4, End]
}

let player, inDoor = false, song; 

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard keys
let keySPACE, keyENTER;

