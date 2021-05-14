class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room', 'assets/img/main_hub.png');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room').setOrigin(0, 0);
    }
}
