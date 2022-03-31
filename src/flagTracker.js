class FlagTracker {
    static _flags = [];

    static checkForFlag(flag) {
        return this._flags.includes(flag);
    }

    static addFlag(flag) {
        this._flags.push(flag);
    }

    static removeFlag(flag) {
        let index = this._flags.lastIndexOf(flag);
        if (index > -1) {
            this._flags.splice(index, 1);
        }
    }

    static latestFlag() {
        return this._flags[this._flags.length - 1];
    }
}
