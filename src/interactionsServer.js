class InteractionsServer {
    constructor(jsonCache) {
        this.jsonCache = jsonCache;
    }

    fetchInteraction(interactionKey) {
        // Get the interaction set corresponding to the key from the cache
        // If none found, return an error message object
        // If found, get the array of interactions out of the set
        // Loop through the array to find the first one that hasn't been shown and whose conditions are fulfilled
        // If none found, get the fallback "nothing more to say" interaction from the set
        // Return the interaction unit object
        return { words: "Lorem ipsum" };
    }
}