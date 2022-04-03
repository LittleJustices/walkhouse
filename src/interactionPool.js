const MSG_ERRORS = {
    NOTINCACHE: "Data for this actor not found in cache",
    NOFALLBACK: "No fallback interaction defined",
    NOWORDS: "Interaction text not defined"
}

class InteractionPool {
    constructor(interactionsData) {
        if (!interactionsData) {
            // For null or undefined data, make a fallback with an error message
            interactionsData = {
                fallbacks: this.interactionNotFound(MSG_ERRORS.NOTINCACHE)
            };
        }
        this.interactions = this.populateInteractions(interactionsData.interactions);
        this.fallbacks = this.populateInteractions(interactionsData.fallbacks);
    }

    populateInteractions(interactionsArray) {
        // TODO: check if the interactions array exists and return an error if not
        let interactions = [];
        if (Array.isArray(interactionsArray)) {
            // loop through the interactions array and create an interaction object for each interaction recursively
            interactionsArray.forEach(interactionObject => {
                interactions.push(new Interaction(this, interactionObject));
            });
        } else if (interactionsArray) {
            // If not an array but not null or undefined, push a single interaction
            interactions.push(new Interaction(this, interactionsArray));
        }
        return interactions;    // If the array was null or undefined this will return an empty array
    }

    findFirstLegalInteraction(interactionsTree) {
        // First look for a legal interaction which requires the most recent flag that has been set.
        let nextInteraction = interactionsTree.find(interactionItem => {
            return !interactionItem.alreadyViewed && interactionItem.conditions.includes(FlagTracker.latestFlag());
        });
        // If there isn't one, loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        if (!nextInteraction) {
            nextInteraction = interactionsTree.find(interactionItem => {
                return !interactionItem.alreadyViewed && this.evaluateConditions(interactionItem.conditions, interactionItem.unconditions);
            });
        }
        return nextInteraction; // returns undefined if no interaction was found
    }

    evaluateConditions(conditions, unconditions) {
        // Loop through the array of conditions and check them against the flag tracker. If the array is empty it will skip this
        for (let i = 0; i < conditions.length; i++) {
            const flag = conditions[i];
            if (!FlagTracker.checkForFlag(flag)) {
                // If any condition is not in the flags array, return false
                return false
            }
        }
        
        // Do the same for the unconditions array
        for (let i = 0; i < unconditions.length; i++) {
            const flag = unconditions[i];
            if (FlagTracker.checkForFlag(flag)) {
                // If any UNcondition IS in the flags array, return false
                return false
            }
        }

        return true;
    }

    findNextInteraction() {
        // Get the first interaction that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = this.findFirstLegalInteraction(this.interactions);
        // If none are found, check if there's a fallback defined
        if (!nextInteraction) {
            // If there are multiple fallbacks, pick one at random
            let randomFallbackIndex = Phaser.Math.RND.integerInRange(0, this.fallbacks.length - 1);
            let fallback = this.fallbacks[randomFallbackIndex];
            // If that's null or undefined, return an error, otherwise, return the fallback
            if (!fallback) {
                return this.interactionNotFound(MSG_ERRORS.NOFALLBACK);
            } else {
                nextInteraction = fallback;
            }
        }
        if (nextInteraction.words == "") {
            return this.interactionNotFound(MSG_ERRORS.NOWORDS);
        }
        return nextInteraction;
    }

    interactionNotFound(errorCode) {
        return {
            words: "Er, what was I going to say...? Nevermind.\n\n(An error occurred fetching the dialogue data: " + 
                errorCode + 
                ". Please contact the developer.)"
        }
    }
}
