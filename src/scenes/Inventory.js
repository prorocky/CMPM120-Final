class Inventory extends Phaser.Scene{
    constructor(){
        super("inventoryScene");
        this.maxColumns = 5;
        this.rows = 1;
        this.uiScale = 1.5;
        this.gridSpacing = 4;
        this.margin = 8; 
        this._tileSize = 32;
        this.inventorySlots = [];
    }

    preload() {
        //loading little inventory tile
        this.load.image('inventorySlot', 'assets/img/inventorySlot01.png');
    }

    //pulling data from other scenes
    init(data){
        let { playScene } = data;
        this.playScene = playScene;
        //this.inventory = playScene.player.inventory; 

    }

    //configs size of tiles based on code in refresh() that manages # of tiles in inventory
    get tileSize(){
        return this._tileSize * this.uiScale;
    }

    refresh() {

    }

    create(){
        let inventorySlot = this.add.sprite(90,90, "inventorySlot");

        

    }



}