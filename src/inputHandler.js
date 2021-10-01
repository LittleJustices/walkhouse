class InputHandler {
    constructor() {}

    createKeys(inputsScene) {
        this.keys = inputsScene.input.keyboard.addKeys({
            "numUp": Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
            "numTopRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE,
            "numRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            "numBottomRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE,
            "numDown": Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
            "numBottomLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
            "numLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
            "numTopLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN,
            "numZero": Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
            "enter": Phaser.Input.Keyboard.KeyCodes.ENTER,
            "w": Phaser.Input.Keyboard.KeyCodes.W,
            "a": Phaser.Input.Keyboard.KeyCodes.A,
            "s": Phaser.Input.Keyboard.KeyCodes.S,
            "d": Phaser.Input.Keyboard.KeyCodes.D,
            "shift": Phaser.Input.Keyboard.KeyCodes.SHIFT,
            "space": Phaser.Input.Keyboard.KeyCodes.SPACE,
            "arrowUp": Phaser.Input.Keyboard.KeyCodes.UP,
            "arrowRight": Phaser.Input.Keyboard.KeyCodes.RIGHT,
            "arrowDown": Phaser.Input.Keyboard.KeyCodes.DOWN,
            "arrowLeft": Phaser.Input.Keyboard.KeyCodes.LEFT,
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