
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
    scene: [Play, Puzzle1, Inventory, Puzzle2]
}

let player; 
let door;

// game variable
let game = new Phaser.Game(config);

// game config variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard keys
let keyW, keyA, keyS, keyD, keySPACE, keyT;

//testing commit
