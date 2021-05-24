class InventoryScene extends Phaser.Scene{
    constructor(){
        super("inventoryScene");
        this.maxColumns = 2;
        this.maxRows = 3;
        this.rows = 3;
        this.uiScale = 1.5;
        this.gridSpacing = 150;
        this.margin = 75; 
        this._tileSize = 1;
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
        for(let index = 0; index < this.maxColumns * this.rows; index++){
            let x  = this.margin + this.tileSize / 2 + (index * (this.tileSize + this.gridSpacing));
            let y =  this.margin + this.tileSize * 600;
            let inventorySlot = this.add.sprite(x, y, "inventorySlot");
            inventorySlot.setScale(this.uiScale);
        }
    }

    create(){
        this.refresh();

    }



}