class InteractionsHandler {
    constructor() {
        this.currentInteraction = {};
    }

    static _instance;

    static instance() {
        if (!this._instance) {
            this._instance = new InteractionsHandler();
        }
        return this._instance;
    }

    handleInteraction(interactionPool) {
        // Call into the pool to provide the interaction to handle
        this.currentInteraction = interactionPool.findNextInteraction();
        // Handle anything that needs to be done before the interaction, e.g. event, setting name and portrait, etc.
        // Send the message to the dialogue box to be displayed
        dialogueBox.displayDialogue(this.currentInteraction.words);
    }

    // Called by the dialogue box when player presses forward on the last page of an interaction
    handleEndOfInteraction() {
        // Handle anything that's supposed to happen after the interaction but before the next

        // Set the interaction to already viewed, but don't bother if it doesn't have a value for that already
        this.currentInteraction.alreadyViewed = true;

        // Check if the current interaction has any followups to display
        let followupInteraction = this.currentInteraction.findFollowupInteraction();
        if (!followupInteraction) {
            // If there are no legal followups, clear the current interaction, reset game to exploration state, and clear the dialogue box
            this.currentInteraction = {};
            gameState.state = GameState.explorationState;
        } else {
            // If a followup is found, make that the current interaction and send it to the dialogue box to be displayed
            this.currentInteraction = followupInteraction;
            dialogueBox.displayDialogue(this.currentInteraction.words);
        }
    }

    // Everything below here is deprecated and to be deleted
    // Only keeping it around to reference logic and syntax maybe
    nextInteractionKeys() {
        let followup;   // Remember to handle errors
        this.currentInteraction.followup.forEach(followupOption => {
            if (followupOption.condition) { // More sophisticated logic for checking conditions goes here
                followup = followupOption;
            }
        })
        return followup;
    }

    // Look up an entity's interaction key in the json cache and return the interaction object, if found
    getInteractionSetFromKey(entityKey) {
        // If that interaction key does not exist, get will return null. In that case, return an error message interaction instead
        return this.scene.cache.json.get(entityKey);
    }

    getDialogueEntryFromKeys(entityKey, dialogueKey) {
        let interactionSet = this.getInteractionSetFromKey(entityKey);
        return GetValue(interactionSet.interactions, dialogueKey, {words: "Error fetching dialogue data"})
    }
}
