class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room', 'assets/img/main_hub.png');
        this.load.image('p1', 'assets/img/toad.jpg');

        // load audio
        this.load.audio('temp', 'assets/aud/LoseCondition1.wav');
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

        // move to new room if you move to the right (there will be a door)
        if ((this.shroom.x > 950) && (this.shroom.x < 970) && (this.shroom.y <= 550) && (this.shroom.y >= 530)) {
            this.sound.play('temp');
            this.scene.start('puzScene1');
        }
    }
}
