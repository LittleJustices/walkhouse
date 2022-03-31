class Interaction {
    constructor(interactionObject) {
        this.alreadyViewed = false;     // I suppose any interaction will always start unviewed so we don't need this in the json
        this.conditions = interactionObject.conditions;

        this.words = interactionObject.words;

        this.followups = this.populateFollowups(interactionObject.followups);
    }

    populateFollowups(followupsArray) {
        // If no followups are defined, return an empty array
        if (!followupsArray) {
            return [];
        }
        let followups = [];

        followupsArray.forEach(followupObject => {
            followups.push(new Interaction(followupObject));
        });

        return followups;
    }
}