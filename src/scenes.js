class HouseScene extends Phaser.Scene {
    constructor(config, actorKeys) {
        super({
            key: config.sceneTitle,
        });
        this.transitionTarget = config.transitionTarget;
        this.actorKeys = actorKeys;
    }

    preload() {
        // load tileset and map
        this.load.image("room-tiles", "../assets/tile.png");
        this.load.tilemapTiledJSON("room-map", "../assets/room.json");

        // Load player assets
        this.load.image(LoadInfo.playerKey + "-sprite", LoadInfo.spritesPath + LoadInfo.playerKey + ".png");
        this.load.json(LoadInfo.playerKey + "-data", LoadInfo.actorsPath + LoadInfo.playerKey + ".json");

        // Load NPC assets
        this.actorKeys.forEach(actorKey => {
            this.load.image(actorKey + "-sprite", LoadInfo.spritesPath + actorKey + ".png");
            this.load.json(actorKey + "-data", LoadInfo.actorsPath + actorKey + ".json");
            this.load.json(actorKey + "-lines", LoadInfo.interactionsPath + actorKey + ".json");
        });
    }

    create() {
        const backdropMap = this.make.tilemap({ key: "room-map" });
        this.map = new Map(backdropMap);

        this.scene.run("gui-scene");

        // Array of actors. The player will always be at position 0
        var actors = [];

        // Create player and add to actors
        this.player = this.makePlayer();
        actors.push(this.player);

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
        gameState.state.update(this, command);
        this.gridPhysics.update(delta);
    }

    makePlayer() {
        // Get the data for the player
        const playerData = this.cache.json.get(LoadInfo.playerKey + "-data");

        // Make the sprite and set its properties
        const playerSprite = this.add.sprite(0, 0, LoadInfo.playerKey + "-sprite");
        playerSprite.setDepth(playerData.spriteProperties.depth);
        playerSprite.setScale(playerData.spriteProperties.scale);

        // Make the camera follow the player
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;

        // Create the player entity and return it
        return new Entity( 
            this,   // Pass in this scene
            playerSprite,
            playerData,
            null
        );
    }

    makeNPCs() {
        // Initialize array of non-player actors
        const npcs = [];

        this.actorKeys.forEach(actorKey => {
            // Get an NPC's data
            const actorData = this.cache.json.get(actorKey + "-data");

            // Make the sprite and set its properties
            const actorSprite = this.add.sprite(0, 0, actorKey + "-sprite");
            actorSprite.setDepth(actorData.spriteProperties.depth);
            actorSprite.setScale(actorData.spriteProperties.scale);

            // Create the NPC entity and add it to the NPC array
            const actorEntity = new Entity( 
                this,   // Pass in this scene
                actorSprite, 
                actorData,
                this.cache.json.get(actorKey + "-lines")
            );
            npcs.push(actorEntity);
        })

        // Return the array of NPCs
        return npcs;
    }
}

class InputsScene extends Phaser.Scene {
    constructor() {
        super({
            key: "inputs-scene",
            active: true
        })
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
        dialogueBox = new DialogueBox(this);
    }
}
