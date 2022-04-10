class HouseScene extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.sceneTitle,
        });
        this.transitionTarget = config.transitionTarget;
        this.actorKeys = config.actorKeys;
    }

    preload() {    }

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

        // Stuff to do whenever this scene wakes up
        this.events.on("wake", this.onWakeup);
    }

    update(_time, delta) {
        let command = inputHandler.handleInput();
        gameState.state.update(this, command);
        this.gridPhysics.update(delta);
    }

    onWakeup(system, data) {
        console.log("wakey wakey!");
        console.log(data);
    }

    makePlayer() {
        // Get the data for the player
        const playerData = this.cache.json.get(PLAYER_KEY + "-data");

        // Make the sprite and set its properties
        const playerSprite = this.add.sprite(0, 0, PLAYER_KEY + "-sprite");
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
        }

    create() {
        dialogueBox = new DialogueBox(this);
    }
}

class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "loading-scene",
            active: true
        })
    }

    preload() {
        // Create progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        // Create loading text
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: "Girls are remembering...",
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: "0%",
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        percentText.setOrigin(0.5, 0.5);

        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    
        // load tileset and map
        this.load.image("room-tiles", "../assets/tile.png");
        this.load.tilemapTiledJSON("room-map", "../assets/room.json");

        // Load player assets
        this.load.image(PLAYER_KEY + "-sprite", SPRITES_PATH + PLAYER_KEY + ".png");
        this.load.image(PLAYER_KEY + "-portrait", PORTRAITS_PATH + PLAYER_KEY + ".png")
        this.load.json(PLAYER_KEY + "-data", ACTORS_PATH + PLAYER_KEY + ".json");

        // Load NPC assets
        HOUSE_ACTORS.forEach(actorKey => {
            this.load.image(actorKey + "-sprite", SPRITES_PATH + actorKey + ".png");
            this.load.json(actorKey + "-data", ACTORS_PATH + actorKey + ".json");
            this.load.json(actorKey + "-lines", INTERACTIONS_PATH + actorKey + ".json");
        });

        // Load memory assets
        MEMORY_ACTORS.forEach(actorKey => {
            this.load.image(actorKey + "-sprite", SPRITES_PATH + actorKey + ".png");
            this.load.json(actorKey + "-data", ACTORS_PATH + actorKey + ".json");
            this.load.json(actorKey + "-lines", INTERACTIONS_PATH + actorKey + ".json");
        });

        // Load portrait assets
        this.load.image("empty-portrait", PORTRAITS_PATH + "empty.png");
        PORTRAITS.forEach(portraitKey => {
            this.load.image(portraitKey + "-portrait", PORTRAITS_PATH + portraitKey + ".png");
        });

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + "%");
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            console.log('complete');
        });
    }

    create() {
        // Create start menu text
        var startText = this.make.text({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2,
            text: "Press any key to start",
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
        startText.setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown', function () {
            startText.destroy();
            this.startGame();
        }, this);
    }

    startGame() {
            this.scene.transition({
                target: "house"
            });
            gameState.state = GameState.explorationState;
        }
}
