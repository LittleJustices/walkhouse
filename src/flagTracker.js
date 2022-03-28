class FlagTracker {
    constructor() {
        this.flags = [];
    }

    checkForFlag(flag) {
        return this.flags.includes(flag);
    }
}