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
        return function(textBox) {
            var icon = textBox.getElement('action').setVisible(false);
            textBox.resetChildVisibleState(icon);
            if (textBox.isTyping) {
                textBox.stop(true);
            } else {
                if (textBox.isLastPage) {
                    textBox.page.clearText();
                    // refer to function that decides what to do after a piece of dialogue is over (exit or pull up next piece)
                    eventCenter.emit("end-dialogue");
                } else {
                    textBox.typeNextPage();
                }
            }
        }
    }

    static previousPageCommand() {
        return function(textBox) {
            textBox.page.showPreviousPage();
        }
    }

    static beginInteractionCommand() {
        return function(interactionTarget) {
            gameState.state = GameState.interactionState;
            // locking entities besides the target and player goes here maybe
            displayDialogue("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mi quis lobortis auctor, velit felis bibendum nisi, ut finibus sapien mauris ut eros. Phasellus aliquam venenatis ipsum, vel scelerisque tellus. Sed rutrum tortor mattis, euismod mauris vitae, porttitor velit. Maecenas rutrum ante ante, sed iaculis neque eleifend non. Aliquam erat volutpat. Proin leo eros, interdum ornare nunc ultricies, porttitor maximus nisi. Cras ut ipsum molestie, mattis augue a, cursus eros. In faucibus augue justo, vel iaculis tellus lobortis ac.");

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