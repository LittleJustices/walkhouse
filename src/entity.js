class Entity {
    constructor(sprite, tilePos, scene, isPlayer) {
        this.sprite = sprite;
        this.tilePos = tilePos;
        this.scene = scene;
        this.isPlayer = isPlayer;

        const offsetX = TILE_SIZE / 2;
        const offsetY = TILE_SIZE;

        this.sprite.setOrigin(0.5, 1);
        this.sprite.setPosition(
            tilePos.x * TILE_SIZE + offsetX,
            tilePos.y * TILE_SIZE + offsetY,
        )

        this.movementDirection = DIRECTION.NONE;
        this.lastMovementIntent = DIRECTION.NONE;
        this.speedPixelsPerSecond = TILE_SIZE * 4;
        this.tileSizePixelsWalked = 0;
    }

    moveInDirection(direction) {
        this.scene.gridPhysics.moveActor(this, direction);
    }

    getPosition() {
        return this.sprite.getBottomCenter();
    }

    setPosition(position) {
        this.sprite.setPosition(position.x, position.y);
    }

    getTilePos() {
        return this.tilePos.clone();
    }

    setTilePos(tilePosition) {
        this.tilePos = tilePosition.clone();
    }

    isMoving() {
        return this.movementDirection != DIRECTION.NONE;
    }

    startInteraction() {
        gameState.state = GameState.interactionState;
        displayDialogue("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mi quis lobortis auctor, velit felis bibendum nisi, ut finibus sapien mauris ut eros. Phasellus aliquam venenatis ipsum, vel scelerisque tellus. Sed rutrum tortor mattis, euismod mauris vitae, porttitor velit. Maecenas rutrum ante ante, sed iaculis neque eleifend non. Aliquam erat volutpat. Proin leo eros, interdum ornare nunc ultricies, porttitor maximus nisi. Cras ut ipsum molestie, mattis augue a, cursus eros. In faucibus augue justo, vel iaculis tellus lobortis ac.");
    }

    endInteraction() {
        gameState.state = GameState.explorationState;
    }
}