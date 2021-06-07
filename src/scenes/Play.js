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
            frameWidth: 88, frameHeight: 100
        });
        // load audio
        this.load.audio('music', 'assets/aud/MainBackground.wav');
    }

    create() {
        // background for room
        this.physics.add.sprite (config.width /2 , config.height / 2, 'main_room');

        //calling create walls function
        this.createWalls();

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        

        //creating player
        player = this.physics.add.sprite(config.width/2, config.height/2, "p1");


        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // music
        this.song = this.sound.add('music', {volume: 0.5, loop: true});
        // this.song.play();
        // commented for now cuz I listen to music when I work :3 -Oran

        /*creating animations/linking them with movement 
        so that its a different animation depending on what direction its going in */
        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 5})
        });
        this.anims.create({
            key:"down",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 5})           
        });
        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 5})
        });
        this.anims.create({
            key:"up",
            frames: this.anims.generateFrameNumbers("p1",{ start: 0, end: 5})
        });

        // making sure player doesn't go off bounds
        player.setCollideWorldBounds(true);

        //creates keyboard input values
        this.cursors = this.input.keyboard.createCursorKeys();

        // door
        this.door = this.physics.add.sprite(config.width, config.height / 2, 'door');
        
        let door = this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;
        
        //collider function for walls
        this.physics.add.collider(player, this.walls);

        // creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor1, null, this);

        //this.scene.launch('inventoryScene');

        let controlsConfig = {
            fontFamily: 'Midnight Minutes',
            fontSize: '50px',
            //backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
          
        }
          this.controls = this.add.text(300, 800, 'Use the Arrow Keys to move', controlsConfig);

        //temporary to see coords of player
        this.coord = this.add.text(80, 80, 'X: ' + player.x + ' Y: ' + player.y);

        
    }

    update() {
        // this.coord.text = 'X: ' + Math.floor(player.x) + ' Y: ' + Math.floor(player.y);
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
    hitDoor1 (){
        this.scene.start('puzScene1');
    }

    createWalls(){
        //adding walls to this level 
        this.walls = this.physics.add.staticGroup();
        this.walls.create(600, 120).setScale(40, 9).refreshBody();
        this.walls.setVisible(0);
          
    }
}


/**
 * Proposed changes:
 * 
 * Add sound effect for changing rooms (maybe going up/down stairs, add to "tower" theme)
 * 
 * Add instructions "arrow keys to move, SPACE to interact" to a main menu screen
 *          -> add a main menu scene with some new art? image of tower?
 *          -> fading in text? for the creepy vibes
 * 
 * Do we want there to be some pressure for escaping i.e. max number of mistakes before losing? time limit?
 *          -> for now, items are scattered, play lose audio for wrong item, win audio for correct item, door appears
 *                  -> add animation for "damage" (toggle alpha 0/1)
 *          -> change to scene.pause() scene.resume() so they don't have to do the puzzle over and over
 * 
 * 
 * 
 */

