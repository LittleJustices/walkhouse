const MSG_ERRORS = {
    NOTINCACHE: "Data for this actor not found in cache",
    NOFALLBACK: "No fallback interaction defined"
}

class InteractionsServer {
    constructor(jsonCache) {
        this.jsonCache = jsonCache;
    }

    fetchInteraction(interactionKey) {
        // Get the interaction set corresponding to the key from the cache
        let interactionsSet = this.jsonCache.get(interactionKey);
        // If none found, return an error message object
        if (!interactionsSet) {
            return this.interactionNotFound(MSG_ERRORS.NOTINCACHE);
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
        return {
            words: "Er, what was I going to say...? Nevermind.\n\n(An error occurred fetching the dialogue data: " + 
                errorCode + 
                ". Please contact the developer.)"
        }
    }

    findNextInteraction(interactionsTree) {
        // An extra find goes here, to first look for an interaction which requires the most recent flag that has been set.
        // Loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = interactionsTree.find(interactionItem => {
            return !interactionItem.alreadyViewed && this.evaluateConditions(interactionItem.conditions)
        });
        // If none are found, check if there's a fallback defined
        if (!nextInteraction) {
            let fallback = interactionsTree.fallback;
            // If that's null, return an error, otherwise, return the fallback
            if (!fallback) {
                return this.interactionNotFound(MSG_ERRORS.NOFALLBACK);
            } else {
                return fallback;
            }
        } else {
            return nextInteraction;
        }
    }

    evaluateConditions(conditions) {
        return true;
    }
}