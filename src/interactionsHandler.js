class InteractionsHandler {
    constructor(scene) {
        this.currentInteraction = {};
        this.scene = scene;
        this.server = new InteractionsServer(this.scene.cache.json);
    }

    handleInteraction(interactionKey) {
        // Call into the server to provide the interaction to handle
        let interactionData = this.server.fetchInteraction(interactionKey);
        // Handle anything that needs to be done before the interaction, e.g. event, setting name and portrait, etc.
        // Send the message to the dialogue box to be displayed
        dialogueBox.displayDialogue(interactionData.words);
        // Handle anything that's supposed to happen after the interaction but before the next,
        // including determining whether the dialogue is over or a new interaction needs to be loaded
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