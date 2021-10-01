class GridControls {
    constructor(input, gridPhysics) {
        this.input = input;
        this.gridPhysics = gridPhysics;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasdControls = this.input.keyboard.addKeys("W,A,S,D");
        this.numpadControls = this.input.keyboard.addKeys({
            "numUp": Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
            "numTopRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE,
            "numRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            "numBottomRight": Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE,
            "numDown": Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
            "numBottomLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
            "numLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
            "numTopLeft": Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN,
            "enter": Phaser.Input.Keyboard.KeyCodes.ENTER,
        });
    }

    processMovementInput() {
        if (this.cursors.left.isDown || this.wasdControls.A.isDown || this.numpadControls.numLeft.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.LEFT);
        } else if (this.cursors.right.isDown || this.wasdControls.D.isDown || this.numpadControls.numRight.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.RIGHT);
        // } else if (this.cursors.up.isDown || this.wasdControls.W.isDown || this.numpadControls.numUp.isDown) {
        //     this.gridPhysics.movePlayer(DIRECTION.UP);
        } else if (this.cursors.down.isDown || this.wasdControls.S.isDown || this.numpadControls.numDown.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.DOWN);
        } else if (this.numpadControls.numTopRight.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.TOPRIGHT);
        } else if (this.numpadControls.numTopLeft.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.TOPLEFT);
        } else if (this.numpadControls.numBottomRight.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.BOTTOMRIGHT);
        } else if (this.numpadControls.numBottomLeft.isDown) {
            this.gridPhysics.movePlayer(DIRECTION.BOTTOMLEFT);
        }
    }
}