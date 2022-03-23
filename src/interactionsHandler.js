class InteractionsHandler {
    constructor(scene) {
        this.currentInteraction = {};
        this.scene = scene;
    }

    handleInteraction(interactionsData) {
        let interactionKeys;
        if (this.currentInteraction == {}) interactionKeys = GetValue(interactionsData, "start", "error");
        else interactionKeys = GetValue(interactionsData, "start", "error");
        this.currentInteraction = GetValue(interactionsData.interactions, interactionKeys, {words: "Error fetching dialogue data"});
        // logic to determine which interaction to choose goes here
        displayDialogue(this.currentInteraction.words);
    }

    nextInteractionKeys() {
        let followup;   // Remember to handle errors
        this.currentInteraction.followup.forEach(followupOption => {
            if (followupOption.condition) { // More sophisticated logic for checking conditions goes here
                followup = followupOption;
            }
        })
        return followup;
    }

    getInteractionSetFromKey(entityKey) {
        return this.scene.cache.json.get(entityKey);
    }

    getDialogueEntryFromKeys(entityKey, dialogueKey) {
        let interactionSet = this.getInteractionSetFromKey(entityKey);
        return GetValue(interactionSet.interactions, dialogueKey, {words: "Error fetching dialogue data"})
    }
}