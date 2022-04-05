class Map {
    constructor(backdropMap) {
        this.backdropMap = backdropMap;

        const tileset = this.backdropMap.addTilesetImage("JP House", "room-tiles");
    
        for (let i = 0; i < this.backdropMap.layers.length; i++) {
            const layer = this.backdropMap.createLayer(i, tileset, 0, 0);
            layer.setDepth(i);
            // layer.setScale(2);
        }
        
        this.objectMap = new Array(this.backdropMap.width);
        for (let x = 0; x < this.objectMap.length; x++) {
            this.objectMap[x] = new Array(this.backdropMap.height);
            for (let y = 0; y < this.objectMap[x].length; y++) {
                this.objectMap[x][y] = null;
            }
        }
    }

    addObject(object) {
        this.addAtPosition(object, object.tilePos);
    }

    deleteObject(object) {
        this.deleteAtPosition(object.tilePos);
    }

    addAtPosition(object, pos) {
        this.objectMap[pos.x][pos.y] = object;
    }

    deleteAtPosition(pos) {
        this.objectMap[pos.x][pos.y] = null;
    }

    hasObjectAtPosition(pos) {
        return this.objectMap[pos.x][pos.y] != null;
    }

    getObjectAtPosition(pos) {
        return this.objectMap[pos.x][pos.y];
    }
}
