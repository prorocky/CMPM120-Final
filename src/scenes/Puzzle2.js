class Puzzle2 extends Phaser.Scene {
    constructor() {
        super("puzScene2");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room2', 'assets/img/puzzle_room2.png');

        // load audio
        // this.load.audio('riddle', 'assets/aud/Riddle_Scene2.wav');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room2').setOrigin(0, 0);

        // inventory
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
        //creating player
        player = this.physics.add.sprite(200, config.height - 500, "p1");

        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

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

        this.door = this.physics.add.sprite(config.width - config.width, config.height / 2, 'door');
        
        
        let door =this.add.existing(this.door);
       
        door.body.setCollideWorldBounds = true;
        
        //creating collsion detector
        this.physics.add.overlap(player, door, this.hitDoor1, null, this);

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

    }
    //starts puzzle scene when objects collide 
    hitDoor1 (door, player){
        this.scene.start('playScene');
    }
}
