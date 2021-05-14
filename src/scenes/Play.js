class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room', 'assets/img/main_hub.png');
        this.load.image('p1', 'assets/img/toad.jpg');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room').setOrigin(0, 0);

        // keyboard keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
