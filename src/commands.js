class Commands {
    constructor() {}

    static toggleMemoryCommand() {
        return function() {
            console.log("enter the akyuuverse");
        }
    }

    static moveActorCommand(direction) {
        return function(actor) {
            actor.moveInDirection(direction);
        }
    }

    static nextPageCommand() {
        return function(dialogueBox) {
            dialogueBox.nextPage();
        }
    }

    static previousPageCommand() {
        return function(dialogueBox) {
            dialogueBox.previousPage();
        }
    }

    static beginInteractionCommand() {
        return function(interactionTarget) {
            gameState.state = GameState.interactionState;
            // locking entities besides the target and player goes here maybe
            dialogueBox.displayDialogue("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mi quis lobortis auctor, velit felis bibendum nisi, ut finibus sapien mauris ut eros. Phasellus aliquam venenatis ipsum, vel scelerisque tellus. Sed rutrum tortor mattis, euismod mauris vitae, porttitor velit. Maecenas rutrum ante ante, sed iaculis neque eleifend non. Aliquam erat volutpat. Proin leo eros, interdum ornare nunc ultricies, porttitor maximus nisi. Cras ut ipsum molestie, mattis augue a, cursus eros. In faucibus augue justo, vel iaculis tellus lobortis ac.");

        }
    }

    static endInteractionCommand() {
        return function() {
            // unlock entities that were involved in the interaction
            gameState.state = GameState.explorationState;
        }
    }

    static nullCommand() {
        return function() {
            return;
        }
    }
}