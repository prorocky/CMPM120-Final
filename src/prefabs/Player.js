class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add objects to existing scene
        scene.add.existing(this);

        // speed player moves at
        this.moveSpeed = 3;
        

        // add player sfx
        
    }

    update() {



        if (keyW.isDown) {
            this.y -= this.moveSpeed;
        }
        if (keyA.isDown) {
            this.x -= this.moveSpeed;
        }
        if (keyS.isDown) {
            this.y += this.moveSpeed;
        }
        if (keyD.isDown) {
            this.x += this.moveSpeed;
        }
        

        this.x = Phaser.Math.Clamp(this.x, this.width / 2, game.config.width - this.width / 2);
        this.y = Phaser.Math.Clamp(this.y, this.height / 2, game.config.height - this.height / 2);
    }
}