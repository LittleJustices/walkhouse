class InteractionsHandler {
    constructor(scene) {
        this.scene = scene;
    }

    _currentInteraction = {};

    handleInteraction(interactionPool) {
        // Call into the pool to provide the interaction to handle
        this._currentInteraction = interactionPool.findNextInteraction();
        // Get name and words
        var name = this._currentInteraction.name;
        var portrait = this._currentInteraction.portrait;
        var words = this._currentInteraction.words;
        // Handle anything that needs to be done before the interaction, e.g. event, setting name and portrait, etc.
        // Send the message to the dialogue box to be displayed
        this.scene.dialogueBox.displayDialogue(name, portrait, words);
    }

    // Called by the dialogue box when player presses forward on the last page of an interaction
    handleEndOfInteraction() {
        // Handle anything that's supposed to happen after the interaction but before the next

        // Set the interaction to already viewed, but don't bother if it doesn't have a value for that already
        this._currentInteraction.alreadyViewed = true;

        // Set any flags that the interaction contains
        this._currentInteraction.flags.forEach(flagString => {
            FlagTracker.addFlag(flagString);
        });

        // Check if the current interaction has any followups to display
        let followupInteraction = this._currentInteraction.findFollowupInteraction();
        if (!followupInteraction) {
            // If there are no legal followups, clear the current interaction, reset game to exploration state, and clear the dialogue box
            this._currentInteraction = {};
            gameState.state = GameState.explorationState;
        } else {
            // If a followup is found, make that the current interaction and send it to the dialogue box to be displayed
            this._currentInteraction = followupInteraction;
            this.scene.dialogueBox.displayDialogue(this._currentInteraction.name, this._currentInteraction.portrait, this._currentInteraction.words);
        }
    }
}
