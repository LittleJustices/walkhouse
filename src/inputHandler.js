class InputHandler {
    constructor() {}

    createKeys(inputsScene) {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes; // Alias for readability
        this.keys = inputsScene.input.keyboard.addKeys({
            "numUp":            keyCodes.NUMPAD_EIGHT,
            "numTopRight":      keyCodes.NUMPAD_NINE,
            "numRight":         keyCodes.NUMPAD_SIX,
            "numBottomRight":   keyCodes.NUMPAD_THREE,
            "numDown":          keyCodes.NUMPAD_TWO,
            "numBottomLeft":    keyCodes.NUMPAD_ONE,
            "numLeft":          keyCodes.NUMPAD_FOUR,
            "numTopLeft":       keyCodes.NUMPAD_SEVEN,
            "numZero":          keyCodes.NUMPAD_ZERO,
            "enter":            keyCodes.ENTER,
            "w":                keyCodes.W,
            "a":                keyCodes.A,
            "s":                keyCodes.S,
            "d":                keyCodes.D,
            "shift":            keyCodes.SHIFT,
            "space":            keyCodes.SPACE,
            "arrowUp":          keyCodes.UP,
            "arrowRight":       keyCodes.RIGHT,
            "arrowDown":        keyCodes.DOWN,
            "arrowLeft":        keyCodes.LEFT,
        });
    }

    handleInput() {
        if (this.keys.numUp.isDown)                 return gameState.state.numpadInputs.numUp;
        else if (this.keys.numTopRight.isDown)      return gameState.state.numpadInputs.numTopRight;
        else if (this.keys.numRight.isDown)         return gameState.state.numpadInputs.numRight;
        else if (this.keys.numBottomRight.isDown)   return gameState.state.numpadInputs.numBottomRight;
        else if (this.keys.numDown.isDown)          return gameState.state.numpadInputs.numDown;
        else if (this.keys.numBottomLeft.isDown)    return gameState.state.numpadInputs.numBottomLeft;
        else if (this.keys.numLeft.isDown)          return gameState.state.numpadInputs.numLeft;
        else if (this.keys.numTopLeft.isDown)       return gameState.state.numpadInputs.numTopLeft;
        else if (this.keys.numZero.isDown)          return gameState.state.numpadInputs.numZero;
        else if (this.keys.enter.isDown)            return gameState.state.numpadInputs.enter;
        else if (this.keys.w.isDown)                return gameState.state.wasdInputs.w;
        else if (this.keys.a.isDown)                return gameState.state.wasdInputs.a;
        else if (this.keys.s.isDown)                return gameState.state.wasdInputs.s;
        else if (this.keys.d.isDown)                return gameState.state.wasdInputs.d;
        else if (this.keys.space.isDown)            return gameState.state.wasdInputs.space;
        else if (this.keys.shift.isDown)            return gameState.state.wasdInputs.shift;
        else if (this.keys.arrowUp.isDown)          return gameState.state.arrowInputs.arrowUp;
        else if (this.keys.arrowRight.isDown)       return gameState.state.arrowInputs.arrowRight;
        else if (this.keys.arrowDown.isDown)        return gameState.state.arrowInputs.arrowDown;
        else if (this.keys.arrowLeft.isDown)        return gameState.state.arrowInputs.arrowLeft;
    }
}
