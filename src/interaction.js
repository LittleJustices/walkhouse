const NAME_ERROR = "Forgotten Presence (Error: Actor name not defined)";

class Interaction {
    constructor(pool, interactionObject) {
        this.pool = pool;

        this.alreadyViewed = false;     // I suppose any interaction will always start unviewed so we don't need this in the json

        if (!interactionObject) {
            interactionObject = {};     // Treat null or undefined data as empty
        }

        if (Array.isArray(interactionObject.conditions)) {
            this.conditions = interactionObject.conditions;
        } else if (typeof interactionObject.conditions == "string") {
            this.conditions = [interactionObject.conditions];   // If the conditions are a single string (forgot the brackets), make an array
        } else {
            this.conditions = [];   // If the conditions are undefined or null (or anything other than an array or a string), treat as an empty array
        }

        if (Array.isArray(interactionObject.unconditions)) {
            this.unconditions = interactionObject.unconditions;
        } else if (typeof interactionObject.unconditions == "string") {
            this.unconditions = [interactionObject.unconditions];   // If the conditions are a single string (forgot the brackets), make an array
        } else {
            this.unconditions = [];   // If the conditions are undefined or null (or anything other than an array or a string), treat as an empty array
        }

        if (typeof interactionObject.name == "string") {
            this.name = interactionObject.name;
        } else {
            this.name = NAME_ERROR;
        }

        if (typeof interactionObject.portrait == "string") {
            this.portrait = interactionObject.portrait;
        } else {
            this.portrait = "";
        }

        if (typeof interactionObject.words == "string") {
            this.words = interactionObject.words;
        } else {
            this.words = "";
        }

        if (Array.isArray(interactionObject.flags)) {
            this.flags = interactionObject.flags;
        } else if (typeof interactionObject.flags == "string") {
            this.flags = [interactionObject.flags];
        } else {
            this.flags = [];
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

    findFollowupInteraction() {
        return this.pool.findFirstLegalInteraction(this.followups)
    }
}
