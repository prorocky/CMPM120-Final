
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
    scene: [Play, Puzzle1, Puzzle2, Puzzle3, Puzzle4, InventoryScene]
}

let player, inDoor = false; 

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard keys
let keySPACE, keyT;

