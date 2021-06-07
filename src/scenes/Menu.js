class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images/sprites
        this.load.image('menu_img', 'assets/img/titlecard.png');

        // load audio
        this.load.audio('menumusic', 'assets/aud/mainmenu.wav');
    }

    create() {
        // background image
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'menu_img').setOrigin(0, 0);

        // Enter Key
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.menuMusic = this.sound.add('menumusic', {loop: true});
        this.menuMusic.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.menuMusic.stop();
            this.scene.start('playScene');
        }
    }

}