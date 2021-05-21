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

        // keyboard keys

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        //shroom movement animation config
        
        //creating player
        player = this.physics.add.sprite(32, config.height -500, "p1");

        //creating animations/linking them with movement 
        //so that its a different animation depending on what direction its going in
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

        player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        // door
        this.door = this.physics.add.sprite(config.width - 100, config.height / 2, 'door');
        let door =this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;
        // player.body.onCollide = new this.Phaser.Signal();
        // player.body.onCollide.add(hitDoor1, this);

    }

    update() {
        player.setVelocity(0,0);
        if (this.cursors.left.isDown) {
            //  Move to the left
            player.setVelocityX(-200);
            player.anims.play("left");
          } else if (this.cursors.right.isDown) {
            //  Move to the right
            player.setVelocityX(200);
            player.anims.play("right");
          }
    
          if (this.cursors.up.isDown) {
            //  Move up
            player.setVelocityY(-200);
            player.anims.play("up");
          } else if (this.cursors.down.isDown) {
            //  Move down
            player.setVelocityY(200);
            player.anims.play("down");
          }
          
        //game.physics.arcade.collide(door, player);
        //gonna figure out collision soon 
        // move to new room if you move to the right (there will be a door)
        // if ((this.shroom.x > 950) && (this.shroom.x < 970) && (this.shroom.y <= 550) && (this.shroom.y >= 530)) {
        //     this.sound.play('temp');
        //     this.scene.start('puzScene1');
        }
    
   hitDoor1 (door,player){
       this.scene.start('puzScene1');
   }
    
    
    
    }

