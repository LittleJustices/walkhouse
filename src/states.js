class State {
    constructor(inputMap) {
        this.arrowInputs = inputMap.arrowInputs;
        this.numpadInputs = inputMap.numpadInputs;
        this.wasdInputs = inputMap.wasdInputs;
    }
}

class ExplorationState extends State {
    constructor() {
        super({
            wasdInputs: {
                w: Commands.moveActorCommand(DIRECTION.UP),
                a: Commands.moveActorCommand(DIRECTION.LEFT),
                s: Commands.moveActorCommand(DIRECTION.DOWN),
                d: Commands.moveActorCommand(DIRECTION.RIGHT),
                shift: Commands.nullCommand(),
                space: Commands.nullCommand(),
            },
            numpadInputs: {
                numUp:          Commands.moveActorCommand(DIRECTION.UP),
                numTopRight:    Commands.moveActorCommand(DIRECTION.TOPRIGHT),
                numRight:       Commands.moveActorCommand(DIRECTION.RIGHT),
                numBottomRight: Commands.moveActorCommand(DIRECTION.BOTTOMRIGHT),
                numDown:        Commands.moveActorCommand(DIRECTION.DOWN),
                numBottomLeft:  Commands.moveActorCommand(DIRECTION.BOTTOMLEFT),
                numLeft:        Commands.moveActorCommand(DIRECTION.LEFT),
                numTopLeft:     Commands.moveActorCommand(DIRECTION.TOPLEFT),
                numZero:        Commands.nullCommand(),
                enter:          Commands.toggleMemoryCommand(),
            },
            arrowInputs: {
                arrowUp:    Commands.moveActorCommand(DIRECTION.UP),
                arrowRight: Commands.moveActorCommand(DIRECTION.RIGHT),
                arrowDown:  Commands.moveActorCommand(DIRECTION.DOWN),
                arrowLeft:  Commands.moveActorCommand(DIRECTION.LEFT),
            }
        });
    }

    update(scene, command) {
        let actor = scene.player;
        if (command) {
            command(actor);
        }
    }
}

class InteractionState extends State {
    constructor() {
        super({
            wasdInputs: {
                w:      Commands.previousPageCommand(),
                a:      Commands.previousPageCommand(),
                s:      Commands.nextPageCommand(),
                d:      Commands.nextPageCommand(),
                shift:  Commands.nullCommand(),
                space:  Commands.nextPageCommand(),
            },
            numpadInputs: {
                numUp:          Commands.previousPageCommand(),
                numTopRight:    Commands.nullCommand(),
                numRight:       Commands.nextPageCommand(),
                numBottomRight: Commands.nullCommand(),
                numDown:        Commands.nextPageCommand(),
                numBottomLeft:  Commands.nullCommand(),
                numLeft:        Commands.previousPageCommand(),
                numTopLeft:     Commands.nullCommand(),
                numZero:        Commands.nullCommand(),
                enter:          Commands.nullCommand(),
            },
            arrowInputs: {
                arrowUp:    Commands.previousPageCommand(),
                arrowRight: Commands.nextPageCommand(),
                arrowDown:  Commands.nextPageCommand(),
                arrowLeft:  Commands.previousPageCommand(),
            }
        });

        this.inputLastFrame = false;
    }

    // Logic that locks entities involved in the interaction goes here
    // The player not moving is handled by state change, but NPCs which may move passively in the background should not do so if
    // they're part of an interaction
    // However, both the player and NPCs need to be able to perform scripted movements
    // What NPCs are involved in a given interaction is probably contained in the interaction JSON data

    update(scene, command) {
        let textBox = dialogueBox;
        if (command && !this.inputLastFrame) {
            command(textBox);
            this.inputLastFrame = true;
        } else if (!command) {
            this.inputLastFrame = false;
        }
    }
}

class MenuState extends State {
    constructor() {
        super({
            wasdInputs: {
                w:      Commands.nullCommand(),
                a:      Commands.nullCommand(),
                s:      Commands.nullCommand(),
                d:      Commands.nullCommand(),
                shift:  Commands.nullCommand(),
                space:  Commands.nullCommand(),
            },
            numpadInputs: {
                numUp:          Commands.nullCommand(),
                numTopRight:    Commands.nullCommand(),
                numRight:       Commands.nullCommand(),
                numBottomRight: Commands.nullCommand(),
                numDown:        Commands.nullCommand(),
                numBottomLeft:  Commands.nullCommand(),
                numLeft:        Commands.nullCommand(),
                numTopLeft:     Commands.nullCommand(),
                numZero:        Commands.nullCommand(),
                enter:          Commands.nullCommand(),
            },
            arrowInputs: {
                arrowUp:    Commands.nullCommand(),
                arrowRight: Commands.nullCommand(),
                arrowDown:  Commands.nullCommand(),
                arrowLeft:  Commands.nullCommand(),
            }
        });
    }

    update() {
        
    }
}

class TitleState extends State {
    constructor() {
        super({
            wasdInputs: {
                w:      Commands.nullCommand(),
                a:      Commands.nullCommand(),
                s:      Commands.nullCommand(),
                d:      Commands.nullCommand(),
                shift:  Commands.nullCommand(),
                space:  Commands.nullCommand(),
            },
            numpadInputs: {
                numUp:          Commands.nullCommand(),
                numTopRight:    Commands.nullCommand(),
                numRight:       Commands.nullCommand(),
                numBottomRight: Commands.nullCommand(),
                numDown:        Commands.nullCommand(),
                numBottomLeft:  Commands.nullCommand(),
                numLeft:        Commands.nullCommand(),
                numTopLeft:     Commands.nullCommand(),
                numZero:        Commands.nullCommand(),
                enter:          Commands.nullCommand(),
            },
            arrowInputs: {
                arrowUp:    Commands.nullCommand(),
                arrowRight: Commands.nullCommand(),
                arrowDown:  Commands.nullCommand(),
                arrowLeft:  Commands.nullCommand(),
            }
        });
    }

    update() {
        
    }
}
