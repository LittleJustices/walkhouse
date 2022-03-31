class Interaction {
    constructor(pool, interactionObject) {
        this.pool = pool;

        this.alreadyViewed = false;     // I suppose any interaction will always start unviewed so we don't need this in the json

        if (Array.isArray(interactionObject.conditions)) {
            this.conditions = interactionObject.conditions;
        } else {
            this.conditions = [];   // If the conditions are undefined or null (or anything other than an array), treat as an empty array
        }

        if (typeof interactionObject.words == "string" && interactionObject.words != "") {
            this.words = interactionObject.words;
        } else {
            this.words = "Placeholder error";   // TODO: Replace with proper error
        }

        this.followups = this.populateFollowups(interactionObject.followups);
    }

    populateFollowups(followupsArray) {
        // If no followups are defined, return an empty array
        if (!followupsArray) {
            return [];
        }
        let followups = [];

        followupsArray.forEach(followupObject => {
            followups.push(new Interaction(this.pool, followupObject));
        });

        return followups;
    }

    findFollowupInteraction(){
        return this.pool.findFirstLegalInteraction(this.followups)
    }
}
