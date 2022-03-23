class HouseScene extends Phaser.Scene {
    constructor(sceneTitle) {
        super({
            key: sceneTitle,
        })
    }

    preload() {
        // load tileset and map
        this.load.image("room-tiles", "../assets/tile.png");
        this.load.tilemapTiledJSON("room-map", "../assets/room.json");

        // load sprite images
        this.load.image("player", "../assets/aq.png");
        this.load.image("reimu", "../assets/rm.png");

        // load actor data
        this.load.json("player-data", "../assets/actors/player.json");
        this.load.json("rm-data", "../assets/actors/reimu.json");

        this.load.json("rm-lines", "../assets/interactions/reimu.json");
    }

    create() {
        this.interactionsHandler = new InteractionsHandler(this);
        const backdropMap = this.make.tilemap({ key: "room-map" });
        this.map = new Map(backdropMap);

        this.scene.run("inputs-scene");
        this.scene.run("gui-scene");

        // Array of actors. The player will always be at position 0
        var actors = [];

        // Create player and add to actors
        player = this.makePlayer();
        actors.push(player);

        // Create NPCs and add to actors (with concat because this is an array of npcs)
        const npcs = this.makeNPCs();
        actors = actors.concat(npcs);

        // Add all actors to map
        actors.forEach(actor => {
            this.map.addObject(actor);
        });
    
        // Add all actors to physics engine
        this.gridPhysics = new GridPhysics(actors, this.map);
    }

    update(_time, delta) {
        let command = inputHandler.handleInput();
        gameState.state.update(command);
        this.gridPhysics.update(delta);
    }

    makePlayer() {
        // Get the data for the player
        const playerData = this.cache.json.get("player-data");

        // Make the sprite and set its properties
        const playerSprite = this.add.sprite(0, 0, playerData.spriteKey);
        playerSprite.setDepth(playerData.spriteProperties.depth);
        playerSprite.setScale(playerData.spriteProperties.scale);

        // Make the camera follow the player
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;

        // Create the player entity and return it
        return new Entity(
            playerSprite, 
            new Phaser.Math.Vector2(playerData.entityProperties.initialX, playerData.entityProperties.initialY), 
            this,   // Pass in this scene
            true,   // isPlayer: This is always the player, so hardcoded
            ""      // interactionKey: The player never has an interaction key
        );
    }

    makeNPCs() {
        // Initialize array of non-player actors
        const npcs = [];

        // Get an NPC's data. Later this will be a for loop
        const actorData = this.cache.json.get("rm-data");

        // Make the sprite and set its properties
        const actorSprite = this.add.sprite(0, 0, actorData.spriteKey);
        actorSprite.setDepth(actorData.spriteProperties.depth);
        actorSprite.setScale(actorData.spriteProperties.scale);

        // Create the NPC entity and add it to the NPC array
        const actorEntity = new Entity(
            actorSprite, 
            new Phaser.Math.Vector2(actorData.entityProperties.initialX, actorData.entityProperties.initialY), 
            this,   // Pass in this scene
            false,  // isPlayer: NPCs are by definition never the player
            actorData.entityProperties.interactionKey
        );
        npcs.push(actorEntity);

        // Return the array of NPCs
        return npcs;
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

class GUIScene extends Phaser.Scene {
    constructor() {
        super({ key: "gui-scene"} )
    }

    preload() {
        this.load.scenePlugin(
            'rexuiplugin', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 
            'rexUI', 
            'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {
        dialogueBox = new DialogueBox(this, CANVAS_WIDTH, CANVAS_HEIGHT, {
            fixedHeight: 65,
            outerWidth: CANVAS_WIDTH,
            padding: TEXTBOX_OFFSET,
        });

        eventCenter.on("end-dialogue", () => {
            gameState.state = GameState.explorationState;
        }, this);
    }
}