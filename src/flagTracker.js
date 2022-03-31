class FlagTracker {
    static _flags = [];

    checkForFlag(flag) {
        return _flags.includes(flag);
    }
}