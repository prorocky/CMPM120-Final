class Puzzle4 extends Phaser.Scene {
    constructor() {
        super("puzScene4");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room2', 'assets/img/puzzle_room2.png');
        this.load.image('door', 'assets/img/Door01.png');

        this.load.image('pot_one', 'assets/img/Potion_one.png');
        this.load.image('pot_two', 'assets/img/Potion_two.png');
        this.load.image('pot_three', 'assets/img/Potion_three.png');
        this.load.image('pot_four', 'assets/img/Potion_four.png');
        this.load.image('pot_five', 'assets/img/Potion_five.png');
        this.load.image('pot_six', 'assets/img/Potion_six.png');
        this.load.image('pot_seven', 'assets/img/Potion_seven.png');
        this.load.image('pot_eight', 'assets/img/Potion_eight.png');
        this.load.image('pot_nine', 'assets/img/Potion_nine.png');
        this.load.image('pot_ten', 'assets/img/Potion_ten.png');
        this.load.image('pot_eleven', 'assets/img/Potion_eleven.png');
        this.load.image('pot_twelve', 'assets/img/Potion_twelve.png');
        this.load.image('pot_thirteen', 'assets/img/Potion_thirteen.png');


        // load audio
        this.load.audio('riddle', 'assets/aud/Riddle_Scene2.wav');
        this.load.audio('correct', 'assets/aud/WinCondition.wav');
        this.load.audio('wrong', 'assets/aud/LoseCondition.wav');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room2').setOrigin(0, 0);

        this.tile1 = this.physics.add.sprite(75, 300, 'tile');
        this.tile2 = this.physics.add.sprite(75, 300, 'tile');
        this.tile3 = this.physics.add.sprite(75, 300, 'tile');
        this.tile4 = this.physics.add.sprite(75, 300, 'tile');
        this.tile5 = this.physics.add.sprite(75, 300, 'tile');
        this.tile6 = this.physics.add.sprite(75, 300, 'tile');
        this.tile7 = this.physics.add.sprite(75, 300, 'tile');
        this.tile8 = this.physics.add.sprite(75, 300, 'tile');
        this.tile9 = this.physics.add.sprite(75, 300, 'tile');
        this.tile10 = this.physics.add.sprite(75, 300, 'tile');
        this.tile11 = this.physics.add.sprite(75, 300, 'tile');
        this.tile12 = this.physics.add.sprite(75, 300, 'tile');
        this.tile13 = this.physics.add.sprite(75, 300, 'tile');
        this.tile15 = this.physics.add.sprite(75, 300, 'tile');
        this.tile16 = this.physics.add.sprite(75, 300, 'tile');
        this.tile17 = this.physics.add.sprite(75, 300, 'tile');
        this.tile18 = this.physics.add.sprite(75, 300, 'tile');
        this.tile19 = this.physics.add.sprite(75, 300, 'tile');
        this.tile20 = this.physics.add.sprite(75, 300, 'tile');
        this.tile21 = this.physics.add.sprite(75, 300, 'tile');
        this.tile22 = this.physics.add.sprite(75, 300, 'tile');
        this.tile23 = this.physics.add.sprite(75, 300, 'tile');
        this.tile25 = this.physics.add.sprite(75, 300, 'tile');
    }
}
