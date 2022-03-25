class InteractionsHandler {
    constructor() {
        this.currentInteraction = {};
        this.server = new InteractionsServer(game.cache.json);
    }

    static _instance;

    static instance() {
        if (!this._instance) {
            this._instance = new InteractionsHandler();
        }
        return this._instance;
    }

    handleInteraction(interactionKey) {
        // Call into the server to provide the interaction to handle
        this.currentInteraction = this.server.fetchInteraction(interactionKey);
        // Handle anything that needs to be done before the interaction, e.g. event, setting name and portrait, etc.
        // Send the message to the dialogue box to be displayed
        dialogueBox.displayDialogue(this.currentInteraction.words);
        // Handle anything that's supposed to happen after the interaction but before the next,
        // including determining whether the dialogue is over or a new interaction needs to be loaded
    }

    // Called by the dialogue box when player presses forward on the last page of an interaction
    handleEndOfInteraction() {
        // Get the followups array out of the current interaction and pass them to the server to check if any should be displayed
        // If there are no legal followups, reset game to exploration state and clear the dialogue box
        gameState.state = GameState.explorationState;
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