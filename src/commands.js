class Commands {
    constructor() {}

    static toggleMemoryCommand() {
        return function(player) {
            player.scene.scene.transition({
                target: player.scene.transitionTarget,
                sleep: true,
                data: "this is the data passed into the wakeup event"
            });
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

    static openMenuCommand() {
        return function() {
            gameState.state = GameState.menuState;
            gameState.state.menu.showMenu();
        }
    }

    static closeMenuCommand() {
        return function() {
            gameState.state.menu.hideMenu();
            gameState.state = GameState.explorationState;
        }
    }

    static nullCommand() {
        return function() {
            return;
        }
    }
}
