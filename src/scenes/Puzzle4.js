class Puzzle4 extends Phaser.Scene {
    constructor() {
        super("puzScene4");
    }

    preload() {
        // load images/sprites
        this.load.image('main_room4', 'assets/img/puzzle_room4.png');
        this.load.image('door', 'assets/img/Door01.png');
        this.load.image('solved_room02', 'assets/img/puzzle_room4_solved.png');

        this.load.image('tile', 'assets/img/square.png');
        this.load.image('glow', 'assets/img/square_glow.png');

        this.load.spritesheet('p1', 'assets/img/mushsprite.png',
        {
            frameWidth: 88, frameHeight: 100
        });


        // load audio

        this.load.audio('correct', 'assets/aud/WinCondition.wav');
        this.load.audio('wrong', 'assets/aud/LoseCondition.wav');
        this.load.audio('gree', 'assets/aud/Riddle3_Final.wav');
    }

    create() {
        // background for room
        this.background = this.add.tileSprite(0, 0, 1080, 1080, 'main_room4').setOrigin(0, 0);

        // fade into scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //creates keyboard input values
        this.cursors = this.input.keyboard.createCursorKeys();

        this.gree = this.sound.add('gree', {volume: 0.5});
        this.gree.play();

        // flag for solved room
        this.solved = false;

        // flag for moving
        this.started = false;

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

        this.tile0 = this.physics.add.sprite(264, 455, 'tile');
        this.tile1 = this.physics.add.sprite(383, 455, 'tile');
        this.tile2 = this.physics.add.sprite(502, 455, 'tile');
        this.tile3 = this.physics.add.sprite(621, 455, 'tile');
        this.tile4 = this.physics.add.sprite(740, 455, 'tile');
        this.tile5 = this.physics.add.sprite(264, 577, 'tile');
        this.tile6 = this.physics.add.sprite(383, 577, 'tile');
        this.tile7 = this.physics.add.sprite(502, 577, 'tile');
        this.tile8 = this.physics.add.sprite(621, 577, 'tile');
        this.tile9 = this.physics.add.sprite(740, 577, 'tile');
        this.tile10 = this.physics.add.sprite(264, 699, 'tile');
        this.tile11 = this.physics.add.sprite(383, 699, 'tile');
        this.tile12 = this.physics.add.sprite(502, 699, 'tile');
        this.tile13 = this.physics.add.sprite(621, 699, 'tile');
        this.tile14 = this.physics.add.sprite(740, 699, 'tile');
        this.tile15 = this.physics.add.sprite(264, 821, 'tile');
        this.tile16 = this.physics.add.sprite(383, 821, 'tile');
        this.tile17 = this.physics.add.sprite(502, 821, 'tile');
        this.tile18 = this.physics.add.sprite(621, 821, 'tile');
        this.tile19 = this.physics.add.sprite(740, 821, 'tile');
        this.tile20 = this.physics.add.sprite(264, 943, 'tile');
        this.tile21 = this.physics.add.sprite(383, 943, 'tile');
        this.tile22 = this.physics.add.sprite(502, 943, 'tile');
        this.tile23 = this.physics.add.sprite(621, 943, 'tile');
        this.tile24 = this.physics.add.sprite(740, 943, 'tile');

        this.tilesArray = [this.tile0, this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8, this.tile9, this.tile10, this.tile11, this.tile12, this.tile13, this.tile14, this.tile15, this.tile16, this.tile17, this.tile18, this.tile19, this.tile20, this.tile21, this.tile22, this.tile23, this.tile24];

        // keys for map are each tile, values for map are tiles adjacent
        this.tiles = new Map([
            [this.tile0, [this.tile1, this.tile5]],
            [this.tile1, [this.tile0, this.tile2, this.tile6]],
            [this.tile2, [this.tile1, this.tile3, this.tile7]],
            [this.tile3, [this.tile2, this.tile4, this.tile8]],
            [this.tile4, [this.tile3, this.tile9]],
            [this.tile5, [this.tile6, this.tile10]],
            [this.tile6, [this.tile5, this.tile7, this.tile11]],
            [this.tile7, [this.tile6, this.tile8, this.tile12]],
            [this.tile8, [this.tile7, this.tile9, this.tile13]],
            [this.tile9, [this.tile8, this.tile14]],
            [this.tile10, [this.tile11, this.tile15]],
            [this.tile11, [this.tile10, this.tile12, this.tile16]],
            [this.tile12, [this.tile11, this.tile13, this.tile17]],
            [this.tile13, [this.tile12, this.tile14, this.tile18]],
            [this.tile14, [this.tile13, this.tile19]],
            [this.tile15, [this.tile16, this.tile20]],
            [this.tile16, [this.tile15, this.tile17, this.tile21]],
            [this.tile17, [this.tile16, this.tile18, this.tile22]],
            [this.tile18, [this.tile17, this.tile19, this.tile23]],
            [this.tile19, [this.tile18, this.tile24]],
            [this.tile20, [this.tile21, 'end']],
            [this.tile21, [this.tile20, this.tile22, 'end']],
            [this.tile22, [this.tile21, this.tile23, 'end']],
            [this.tile23, [this.tile22, this.tile24, 'end']],
            [this.tile24, [this.tile23, 'end']],

        ]);

        this.createPath();

        //creating player
        player = this.physics.add.sprite(150, 300, "p1");

        //making sure player doesn't go off bounds
        player.setCollideWorldBounds(true);

        // door to escape
        this.door = this.physics.add.sprite(1100, 650, 'door');
        this.door.alpha = 0;

        // print path
        // this.path.forEach(element => this.printPath(element));

        this.time.delayedCall(8000, () => {
            this.showPath(this.path);
        }, null, this);

        this.time.delayedCall((this.path.length / 2 + 3) * 1000 + 8000, () => {
            this.resetPath();
            this.started = true;
        }, null, this);

        this.steppedTiles = [];

        


    }

    update() {
        player.setVelocity(0,0);
        
        if (this.started) {
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

        if (!this.solved) {
            this.tilesArray.forEach(element => {
                // if overlapping with a tile
                if (this.physics.overlap(player, element)) {
                    // if tile is not already in steppedTiles
                    if (!this.steppedTiles.includes(element)) {
                        // if element in path, correct tile
                        if (this.path.includes(element)) {
                            this.steppedTiles.push(element);
                        }
                        // else, wrong tile, restart scene
                        else {
                            this.sound.play('wrong');
                            this.gree.stop();
                            this.scene.restart();
                        }
                        
                    }
                }
            });
        }

        if (!this.solved && this.steppedTiles.length == this.path.length - 1) {
            this.solved = true;
            this.background.setTexture('solved_room02');
            this.sound.play('correct');
        }

        if (this.physics.overlap(player, this.door)) {
            this.hitdoor5();
        }
    }

    createPath() {
        this.path = [];
        let rng = Math.floor(Math.random() * 4);
        let currentTile = this.tilesArray[rng];
        this.path.push(currentTile);

        while (currentTile != 'end') {
            this.updateAdjacency(currentTile);
            // random number up to length of adjacent tiles
            rng = Math.floor(Math.random() * this.tiles.get(currentTile).length);
            // select tile from adjacent list
            currentTile = this.tiles.get(currentTile)[rng];
            // push to this.path
            this.path.push(currentTile);
        }
    }
    printPath(tile) {
        switch(tile) {
            case this.tile0:
                console.log("tile0");
                break;
            case this.tile1:
                console.log("tile1");
                break;
            case this.tile2:
                console.log("tile2");
                break;
            case this.tile3:
                console.log("tile3");
                break;
            case this.tile4:
                console.log("tile4");
                break;
            case this.tile5:
                console.log("tile5");
                break;
            case this.tile6:
                console.log("tile6");
                break;
            case this.tile7:
                console.log("tile7");
                break;
            case this.tile8:
                console.log("tile8");
                break;
            case this.tile9:
                console.log("tile9");
                break;
            case this.tile10:
                console.log("tile10");
                break;
            case this.tile11:
                console.log("tile11");
                break;
            case this.tile12:
                console.log("tile12");
                break;
            case this.tile13:
                console.log("tile13");
                break;
            case this.tile14:
                console.log("tile14");
                break;
            case this.tile15:
                console.log("tile15");
                break;
            case this.tile16:
                console.log("tile16");
                break;
            case this.tile17:
                console.log("tile17");
                break;
            case this.tile18:
                console.log("tile18");
                break;
            case this.tile19:
                console.log("tile19");
                break;
            case this.tile20:
                console.log("tile20");
                break;
            case this.tile21:
                console.log("tile21");
                break;
            case this.tile22:
                console.log("tile22");
                break;
            case this.tile23:
                console.log("tile23");
                break;
            case this.tile24:
                console.log("tile24");
                break;
            case 'end':
                console.log("end");
                break;
            default:
                console.log("something else");
        }

    }

    updateAdjacency(tile) {
        if (tile != 'end') {
            for (let i = 0; i < 25; i++) {
                let idx = this.tiles.get(this.tilesArray[i]).indexOf(tile);
                if (idx != -1) {
                    this.tiles.get(this.tilesArray[i]).splice(idx, 1);
                }
            }
        }
    }

    // loop/delay taken from stackoverflow:
    // https://stackoverflow.com/questions/15778472/display-array-elements-with-delay
    showPath(path) {
        let i = 0;
        (function loop() {
            path[i].setTexture('glow');
            if (++i < path.length - 1) {
                setTimeout(loop, 500);
            }
        })();
    }

    resetPath() {
        for (let i = 0; i < 25; i++) {
            this.tilesArray[i].setTexture('tile');
        }
    }

    hitdoor5() {
        if (this.solved) {
            song.stop();
            this.scene.start('endScene');
        }
    }
}
