class InteractionPool {
    constructor(interactionsData) {
        if (!interactionsData) {
            return;
        }
        this.interactions = this.populateInteractions(interactionsData.interactions);
        this.fallback = interactionsData.fallback;
    }

    populateInteractions(interactionsArray) {
        // TODO: check if the interactions array exists and return an error if not
        let interactions = [];
        // loop through the interactions array and create an interaction object for each interaction recursively
        interactionsArray.forEach(interactionObject => {
            interactions.push(new Interaction(interactionObject));
        });
        return interactions;
    }
}