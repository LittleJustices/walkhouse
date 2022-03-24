class Entity {
    constructor(sprite, tilePos, scene, isPlayer, interactionKey) {
        this.sprite = sprite;
        this.tilePos = tilePos;
        this.scene = scene;
        this.isPlayer = isPlayer;
        this.interactionKey = interactionKey

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
        gameState.state = GameState.interactionState;   // Set game state to interaction
        this.scene.interactionsHandler.handleInteraction(this.interactionKey);
    }

    endInteraction() {
        gameState.state = GameState.explorationState;
    }
}