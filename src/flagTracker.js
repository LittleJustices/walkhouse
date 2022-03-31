class FlagTracker {
    static _flags = [];

    static checkForFlag(flag) {
        return this._flags.includes(flag);
    }
}