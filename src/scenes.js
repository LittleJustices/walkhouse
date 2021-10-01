class HouseScene extends Phaser.Scene {
    constructor(sceneTitle) {
        super({
            key: sceneTitle,
        })
    }

    preload() {
        this.load.image("room-tiles", "../assets/tile.png");
        this.load.tilemapTiledJSON("room-map", "../assets/room.json");
        this.load.image("player", "../assets/aq.png");
        this.load.image("reimu", "../assets/rm.png");
    
        this.load.scenePlugin(
            'rexuiplugin', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 
            'rexUI', 
            'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {
        const backdropMap = this.make.tilemap({ key: "room-map" });
        this.map = new Map(backdropMap);

        this.scene.run("inputs-scene");
    
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.setDepth(2);
        playerSprite.setScale(0.25);
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;
    
        player = new Entity(playerSprite, new Phaser.Math.Vector2(11, 8), this, true);
        this.map.addObject(player);
    
        const reimuSprite = this.add.sprite(0, 0, "reimu");
        reimuSprite.setDepth(2);
        reimuSprite.setScale(0.25);
        const reimu = new Entity(reimuSprite, new Phaser.Math.Vector2(8, 8), this, false);
        this.map.addObject(reimu);
    
        this.gridPhysics = new GridPhysics([player, reimu], this.map);
    
        dialogueBox = createTextBox(this, CANVAS_WIDTH, CANVAS_HEIGHT, {
            fixedHeight: 65,
            outerWidth: CANVAS_WIDTH,
            padding: TEXTBOX_OFFSET,
        }).setScrollFactor(0);

        eventCenter.on("end-dialogue", () => {
            gameState.state = GameState.explorationState;
        }, this);
    }

    update(_time, delta) {
        let command = inputHandler.handleInput();
        gameState.state.update(command);
        this.gridPhysics.update(delta);
    }
}

class InputsScene extends Phaser.Scene {
    constructor() {
        super({key: "inputs-scene"})
    }

    create() {
        inputHandler.createKeys(this);
    }
}