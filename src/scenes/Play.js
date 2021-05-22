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
        }
    );
        // load audio
        this.load.audio('temp', 'assets/aud/LoseCondition1.wav');
    }

    create() {
        // background for room
        this.physics.add.sprite (config.width /2 , config.height / 2, 'main_room');

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
        //creating player
        player = this.physics.add.sprite(config.width/2, config.height/2, "p1");

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

        // door
        this.door = this.physics.add.sprite(config.width - 80, config.height / 2, 'door');
        
        let door =this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;
        
        //creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor1, null, this);

    }

    update() {
        player.setVelocity(0,0);
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
          
        }
   
        //starts puzzle scene when objects collide 
   hitDoor1 (door,player){
       this.scene.start('puzScene1');
   }
    
    
    
    }

