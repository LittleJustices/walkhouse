// Deprecated, InputServer does this

class DialogueSelector {
    constructor() {}

    static getFollowupInteraction() {
        // This function is for taking an interaction and returning one of its followups for which all conditions are met
        // If none are found, it's going to return null, which should prompt ending the interaction
    }

    static startConversation() {
        // This function is for finding the first interaction the player hasn't seen yet and for which all conditions are met
        // If none are found, it should return a default interaction that communicates to the player there is nothing to say for now
    }

    static getInteractionFromKeys(dataCache, entityKey, lineKey) {
        // This function is for getting a specific interaction using its file key and interaction key
        // If none are found, it should return an error
        let interactionsSet = this.getEntityInteractionsFromKey(dataCache, entityKey);
        return GetValue(interactionsSet.interactions, lineKey, {words: "Er, what was I going to say...? Nevermind.\n(An error occurred fetching the dialogue data. Please contact the developer.)"})
    }

    static getEntityInteractionsFromKey(dataCache, entityKey) {
        // This function is for retreiving the set of interactions associated with a specific entity key
        // Using phaser: Pass in scene.cache.json as dataCache
        return dataCache.get(entityKey);
    }
}
