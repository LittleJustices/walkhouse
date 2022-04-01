class GameState {
    constructor(initialState) {
        this._state = initialState;
    }
    get state() {
        return this._state;
    }
    set state(stat) {
        this._state = stat;
    }

    static explorationState = new ExplorationState();
    static interactionState = new InteractionState();
    static menuState = new MenuState();
    static titleState = new TitleState();
}
