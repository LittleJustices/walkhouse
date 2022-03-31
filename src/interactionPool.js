const MSG_ERRORS = {
    NOTINCACHE: "Data for this actor not found in cache",
    NOFALLBACK: "No fallback interaction defined"
}

class InteractionPool {
    constructor(interactionsData) {
        if (!interactionsData) {
            return;
        }
        this.interactions = this.populateInteractions(interactionsData.interactions);
        this.fallbacks = this.populateInteractions(interactionsData.fallbacks);
    }

    populateInteractions(interactionsArray) {
        // TODO: check if the interactions array exists and return an error if not
        let interactions = [];
        // loop through the interactions array and create an interaction object for each interaction recursively
        interactionsArray.forEach(interactionObject => {
            interactions.push(new Interaction(this, interactionObject));
        });
        return interactions;
    }

    findFirstLegalInteraction(interactionsTree) {
        // An extra find goes here, to first look for an interaction which requires the most recent flag that has been set.
        // Loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = interactionsTree.find(interactionItem => {
            return !interactionItem.alreadyViewed && this.evaluateConditions(interactionItem.conditions)
        });
        return nextInteraction; // returns undefined if no interaction was found
    }

    evaluateConditions(conditions) {
        // Loop through the array of conditions and check them against the flag tracker. If the array is empty it will skip this
        for (let i = 0; i < conditions.length; i++) {
            const flag = conditions[i];
            if (!FlagTracker.checkForFlag(flag)) {
                // If any condition is not in the flags array, return false
                return false
            }
        }
        return true;
    }

    findNextInteraction() {
        // Get the first interaction that hasn't been shown and whose conditions are fulfilled
        let nextInteraction = this.findFirstLegalInteraction(this.interactions);
        // If none are found, check if there's a fallback defined
        // If there are multiple fallbacks, pick one at random
        let randomFallbackIndex = Phaser.Math.RND.integerInRange(0, this.fallbacks.length - 1);
        if (!nextInteraction) {
            let fallback = this.fallbacks[randomFallbackIndex];
            // If that's null or undefined, return an error, otherwise, return the fallback
            if (!fallback) {
                return this.interactionNotFound(MSG_ERRORS.NOFALLBACK);
            } else {
                return fallback;
            }
        } else {
            return nextInteraction;
        }
    }

    interactionNotFound(errorCode) {
        return {
            words: "Er, what was I going to say...? Nevermind.\n\n(An error occurred fetching the dialogue data: " + 
                errorCode + 
                ". Please contact the developer.)"
        }
    }
}
