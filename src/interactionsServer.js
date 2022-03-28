const MSG_ERRORS = {
    NOTINCACHE: "Data for this actor not found in cache",
    NOFALLBACK: "No fallback interaction defined"
}

class InteractionsServer {
    constructor(jsonCache) {
        this.jsonCache = jsonCache;
        this.flagTracker = new FlagTracker();
    }

    fetchInteractionFromKey(interactionKey) {
        // Get the interaction set corresponding to the key from the cache
        let interactionsSet = this.jsonCache.get(interactionKey);
        // If none found, return an error message object
        if (!interactionsSet) {
            return this.interactionNotFound(MSG_ERRORS.NOTINCACHE);
        }

        // If found, find the next interaction to be served
        let nextInteraction = this.findNextInteraction(interactionsSet);
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

    findNextInteraction(interactionsSet) {
        // Get the first interaction that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = this.findFirstLegalInteraction(interactionsSet.interactions);
        // If none are found, check if there's a fallback defined
        // Future change: If there are multiple fallbacks, pick one at random
        if (!nextInteraction) {
            let fallback = interactionsSet.fallback;
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

    findFirstLegalInteraction(interactionsTree) {
        // If the array is undefined or null, return null
        if (!interactionsTree) {
            return null;
        }
        // An extra find goes here, to first look for an interaction which requires the most recent flag that has been set.
        // Loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = interactionsTree.find(interactionItem => {
            return !interactionItem.alreadyViewed && this.evaluateConditions(interactionItem.conditions)
        });
        return nextInteraction;
    }

    evaluateConditions(conditions) {
        // If no conditions are defined, just return true
        if (!conditions) {
            return true;
        }
        // Loop through the arraz of conditions and check them against the flag tracker. If the array is empty it will skip this
        for (let i = 0; i < conditions.length; i++) {
            const flag = conditions[i];
            if (!this.flagTracker.checkForFlag(flag)) {
                // If any condition is not in the flags array, return false
                return false
            }
        }
        return true;
    }

    findFollowupInteraction(starterInteraction){
        return this.findFirstLegalInteraction(starterInteraction.followups)
    }
}
