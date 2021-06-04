class Puzzle1 extends Phaser.Scene {
    constructor() {
        super("puzScene1");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room1', 'assets/img/puzzle_room1.png');
            // sprites for riddle objects
        this.load.image('gem', 'assets/img/Gems_Prop.png');
        this.load.image('cards', 'assets/img/Cards.png');
        this.load.image('hat', 'assets/img/Hat_Prop.png');
        this.load.image('jars', 'assets/img/Jars.png');
        this.load.image('skull', 'assets/img/Skull.png');
        this.load.image('voodoo1', 'assets/img/VoodooDoll_1.png');
        this.load.image('voodoo2', 'assets/img/VoodooDoll_2.png');
        this.load.image('arm', 'assets/img/ChickenArm.png');


        // load audio
        
        this.load.audio('riddle', 'assets/aud/Riddle_Scene1.wav');
        this.load.audio('correct', 'assets/aud/WinCondition.wav');
        this.load.audio('wrong', 'assets/aud/LoseCondition.wav');
        this.load.audio('greeting', 'assets/aud/WhoDoWeHave.wav');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room1').setOrigin(0, 0);

        // play greeting
        // this.sound.play('greeting');

        this.rid = this.sound.add('riddle');

        // play riddle once
        this.time.delayedCall(8000, () => {
            if (this.playing == false && this.started == false) {
                this.playRiddle();
            }
        }, null, this);

        // add props/items to the room
        this.gem = this.physics.add.sprite(1010, 540, 'gem');
        this.cards = this.physics.add.sprite(250, 975, 'cards');
        this.hat = this.physics.add.sprite(350, 275, 'hat');
        this.jars = this.physics.add.sprite(1000, 350, 'jars');
        this.skull = this.physics.add.sprite(130, 130, 'skull');
        this.doll1 = this.physics.add.sprite(75, 850, 'voodoo1');
        this.doll2 = this.physics.add.sprite(900, 975, 'voodoo2');
        this.arm = this.physics.add.sprite(550, 975, 'arm');

        this.itemArr = [this.gem, this.cards, this.hat, this.jars, this.skull, this.doll1, this.doll2, this.arm];

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // space bar
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //creating player
        player = this.physics.add.sprite(200, config.height - 500, "p1");

        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // flag for starting riddle
        this.started = false;

        // flag for riddle being solved
        this.solved = false;

        // flag for playing riddle audio
        this.playing = false;

        // flag for collision
        this.colliding = false;

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

        //making sure player doesn't go off bounds
        player.setCollideWorldBounds(true);

        //creates keyboard input values
        this.cursors = this.input.keyboard.createCursorKeys();

        // door to next room
        this.door = this.physics.add.sprite(config.width / 2, config.height, 'door');
        let door = this.add.existing(this.door);
        door.alpha = 0;
       
        door.body.setCollideWorldBounds = true;

        //creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor2, null, this);

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

        // press space to play riddle when near mirror
        if (player.x > 400 && player.x < 600 && player.y < 400) {
            this.input.keyboard.once('keydown-SPACE', () => {
                if (!this.playing) {
                    this.playRiddle();
                }
            })
        }
        this.itemArr.forEach(element => {
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

    hitDoor2() {
        if (this.door.alpha == 1) {
            this.scene.start('puzScene2');
            this.rid.stop();
        }
    }

    playRiddle() {
        if (!this.solved) {
            this.playing = true;
            if (!this.started) {
                this.started = true;
            }
            this.rid.play();
            this.time.delayedCall(7500, () => {
                this.playing = false;
            }, null, this);
        }
    }

    detectCollision(item) {
        if (this.door.alpha == 0) {
            if (item == this.skull) {
                this.started = true;
                this.solved = true;
                this.door.alpha = 1;
                this.sound.play('correct');
                this.rid.stop();
            } else {
                this.sound.play('wrong');
            }
        }
    }
}
