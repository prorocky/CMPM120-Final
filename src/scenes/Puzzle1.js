class Puzzle1 extends Phaser.Scene {
    constructor() {
        super("puzScene1");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room', 'assets/img/puzzle_room1.png');
        this.load.image('p1', 'assets/img/toad.jpg');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room').setOrigin(0, 0);

        // keyboard keys
        // movement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // create player
        this.shroom = new Player(
            this,
            game.config.width / 2,
            game.config.height / 2,
            'p1',
            0
        ).setOrigin(0.5, 0.5);
    }

    update() {
        this.shroom.update();
    }
}
