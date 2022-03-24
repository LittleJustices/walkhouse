class InteractionsServer {
    constructor(jsonCache) {
        this.jsonCache = jsonCache;
    }

    fetchInteraction(interactionKey) {
        // Get the interaction set corresponding to the key from the cache
        let interactionsSet = this.jsonCache.get(interactionKey);
        // If none found, return an error message object
        if (!interactionsSet) {
            return this.interactionNotFound("NotInCache");
        }

        // If found, get the array of interactions out of the set
        let interactionsTree = interactionsSet.interactions;
        // Loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = this.findNextInteraction(interactionsTree);
        // If none found, get the fallback "nothing more to say" interaction from the set
        // Return the interaction unit object
        return nextInteraction;
    }

    interactionNotFound(errorCode) {
        if (errorCode == "NotInCache") {
            return {
                words: "Er, what was I going to say...? Nevermind.\n(An error occurred fetching the dialogue data (data for this actor not found in cache). Please contact the developer.)"
            }
        }
    }

    findNextInteraction(interactionsTree) {
        return interactionsTree[0];
    }
}