class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/sprites
        this.load.image('main_room', 'assets/img/main_hub.png');
        this.load.image('door', 'assets/img/Door01.png');

        this.load.spritesheet('p1', 'assets/img/mushsprite.png',
        {
            frameWidth: 121, frameHeight: 143
        });
        // load audio
        this.load.audio('music', 'assets/aud/MainBackground.wav');
        this.load.audio('greeting', 'assets/aud/WhoDoWeHave.wav');
    }

    create() {
        // background for room
        this.physics.add.sprite (config.width /2 , config.height / 2, 'main_room');

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
        //creating player
        player = this.physics.add.sprite(config.width/2, config.height/2, "p1");

        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // music
        // this.song = this.sound.add('music', {volume: 0.5, loop: true});
        // this.song.play();
        // commented for now cuz I listen to music when I work :3 -Oran

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

        // making sure player doesn't go off bounds
        player.setCollideWorldBounds(true);

        //creates keyboard input values
        this.cursors = this.input.keyboard.createCursorKeys();

        // door
        this.door = this.physics.add.sprite(config.width, config.height / 2, 'door');
        
        let door = this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;
        
        // creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor1, null, this);

    }

    update() {
        player.setVelocity(0,0);
        if (this.cursors.left.isDown) {
            // Move to the left
            player.setVelocityX(-500);
            player.anims.play("left");
        } else if (this.cursors.right.isDown) {
            // Move to the right
            player.setVelocityX(500);
            player.anims.play("right");
        }

        if (this.cursors.up.isDown) {
            // Move up
            player.setVelocityY(-500);
            player.anims.play("up");
        } else if (this.cursors.down.isDown) {
            // Move down
            player.setVelocityY(500);
            player.anims.play("down");
        }
        
    }

    //starts puzzle scene when objects collide 
    hitDoor1 (door,player){
        // play greeting
        this.sound.play('greeting');
        this.scene.start('puzScene1');
    }
}


/**
 * Proposed changes:
 * 
 * Add sound effect for changing rooms (maybe going up/down stairs, add to "tower" theme)
 * 
 * Change greeting audio to say "find the riddle" instead of "answer this riddle"
 * 
 * Add instructions "arrow keys to move, SPACE to interact" to a main menu screen
 *          -> add a main menu scene with some new art? image of tower?
 * 
 * Do we want there to be some pressure for escaping i.e. max number of mistakes before losing? time limit?
 *          -> for now, items are scattered, play lose audio for wrong item, win audio for correct item, door appears
 *                  -> add animation for "damage" (toggle alpha 0/1)
 *          -> change to scene.pause() scene.resume() so they don't have to do the puzzle over and over
 * 
 * Riddle 1 says "white and empty" but the skull is purple, clarity issue?
 * 
 */

