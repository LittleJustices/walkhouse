class InteractionsHandler {
    constructor() {}

    static handleInteraction(interactionsData) {
        let startkey = GetValue(interactionsData, "start", "error");
        let currentInteraction = GetValue(interactionsData.interactions, startkey, {words: "Error fetching dialogue data"});
        // logic to determine which interaction to choose goes here
        displayDialogue(currentInteraction.words);
    }
}