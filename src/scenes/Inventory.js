class Inventory extends Phaser.Scene{
    constructor(){
        this.items = {
            0: {name: "skull"},
            3: {name: "voodoo1"}
        }
    }
    getItem(index){
        return this.items[index];
    }
}