class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        // load images/sprites
        this.load.image('end_img', 'assets/img/EndScene.png');

        // load audio
        this.load.audio('music5', 'assets/aud/endscene.wav');
    }

    create() {
        // background image
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'end_img').setOrigin(0, 0);

        this.sound.play('music5', {loop: true});
    }

}