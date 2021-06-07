class Puzzle2 extends Phaser.Scene {
    constructor() {
        super("puzScene2");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room2', 'assets/img/puzzle_room2.png');
        this.load.image('door', 'assets/img/Door01.png');

        this.load.image('pot_one', 'assets/img/Potion_one.png');
        this.load.image('pot_two', 'assets/img/Potion_two.png');
        this.load.image('pot_three', 'assets/img/Potion_three.png');
        this.load.image('pot_four', 'assets/img/Potion_four.png');
        this.load.image('pot_five', 'assets/img/Potion_six.png');
        this.load.image('pot_six', 'assets/img/Potion_seven.png');
        this.load.image('pot_seven', 'assets/img/Potion_box.png');

        this.load.image('glow_darkgreen', 'assets/img/pot_darkgreen.png');
        this.load.image('glow_green', 'assets/img/pot_green.png');
        this.load.image('glow_neongreen', 'assets/img/pot_neongreen.png');
        this.load.image('glow_lightpink', 'assets/img/pot_lightpink.png');
        this.load.image('glow_multi', 'assets/img/pot_multi.png');
        this.load.image('glow_pink', 'assets/img/pot_pink.png');
        this.load.image('glow_pinkblue', 'assets/img/pot_pinkblue.png');
        this.load.image('glow_white', 'assets/img/pot_white.png');

        this.load.image('remains', 'assets/img/prop_mushremains.png');




        // load audio
        this.load.audio('riddle2', 'assets/aud/Riddle_Scene2.wav');
        this.load.audio('correct', 'assets/aud/WinCondition.wav');
        this.load.audio('wrong', 'assets/aud/LoseCondition.wav');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room2').setOrigin(0, 0);

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // space bar
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // play riddle
        this.riddle = this.sound.add('riddle2');
        this.riddle.play();

        /*creating animations/linking them with movement 
        so that its a different animation depending on what direction its going in */
        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 1})
        });
        this.anims.create({
            key:"down",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 1})
            
        });
        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 1})
        });
        this.anims.create({
            key:"up",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 1})
        });

        // create potion items
        this.pot1 = this.physics.add.sprite(75, 300, 'pot_one');
        this.pot2 = this.physics.add.sprite(150, 950, 'pot_two');
        this.pot3 = this.physics.add.sprite(950, 950, 'pot_three');
        this.pot4 = this.physics.add.sprite(1000, 700, 'pot_four');
        this.pot5 = this.physics.add.sprite(250, 300, 'pot_five');
        this.pot6 = this.physics.add.sprite(60, 750, 'pot_six');
        this.pot7 = this.physics.add.sprite(900, 420, 'pot_seven');

        this.potArray = [this.pot1, this.pot2, this.pot3, this.pot4, this.pot5, this.pot6, this.pot7];
        this.glow = this.add.sprite(game.config.width / 2 + 15, game.config.height / 2 + 46, 'glow_pink');
        this.add.sprite(550, 325, 'remains');

        this.colors = ['darkgreen', 'pink', 'white', 'multi', 'pinkblue', 'green', 'neongreen'];

        this.rng = Math.floor(Math.random() * this.colors.length);

        this.glow.setTexture('glow_' + this.colors[this.rng]);

        //creating player
        player = this.physics.add.sprite(200, config.height - 500, "p1");

        //making sure player doesn't go off bounds
        player.setCollideWorldBounds(true);

        //creates keyboard input values
        this.cursors = this.input.keyboard.createCursorKeys();

        // change this to be invisibile door at exit
        this.door = this.physics.add.sprite(config.width / 2, config.height, 'door'); 
        
        let door = this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;

        this.door.alpha = 0;

        // flag for collision
        this.colliding = false;
        
        //creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor3, null, this);

        // temporary to see coords of player
        this.coord = this.add.text(80, 80, 'X: ' + player.x + ' Y: ' + player.y);
    }

    update() {

        player.setVelocity(0,0);
        this.coord.text = 'X: ' + Math.floor(player.x) + ' Y: ' + Math.floor(player.y);
        
        if (this.cursors.left.isDown) {
            //  Move to the left
            player.setVelocityX(-500);
            player.anims.play("left");
        } else if (this.cursors.right.isDown) {
            //  Move to the right
            player.setVelocityX(500);
            player.anims.play("right");
        }
    
        if (this.cursors.up.isDown) {
            //  Move up
            player.setVelocityY(-500);
            player.anims.play("up");
        } else if (this.cursors.down.isDown) {
            //  Move down
            player.setVelocityY(500);
            player.anims.play("down");
        }

        this.potArray.forEach(element => {
            if (this.physics.overlap(player, element)) {
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    if (!this.colliding) {
                        this.detectCollision(element);
                        this.colliding = true;
                    }
                }
            } else {
                this.colliding = false;
            }
        });

    }
    //starts puzzle scene when objects collide 
    hitDoor3() {
        if (this.door.alpha) {
            this.scene.start('puzScene3');
        }
    }

    detectCollision(item) {
        if (this.door.alpha == 0) {
            if (item == this.potArray[this.rng]) {
                this.door.alpha = 1;
                this.sound.play('correct');
                this.playing = true;
                this.riddle.stop();
            } else {
                this.sound.play('wrong');
                this.riddle.stop();
                this.scene.restart();
            }
        }
    }
}