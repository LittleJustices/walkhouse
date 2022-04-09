class Entity {
    constructor(scene, sprite, entityData, interactionData) {
        // TODO: Create handling logic for missing or malformed information in the json data
        this.sprite = sprite;
        this.tilePos = new Phaser.Math.Vector2(entityData.initialPosition);
        this.scene = scene;
        this.isPlayer = entityData.isPlayer;
        this.interactionPool = new InteractionPool(this, interactionData);

        const offsetX = TILE_SIZE / 2;
        const offsetY = TILE_SIZE;

        this.sprite.setOrigin(0.5, 1);
        this.sprite.setPosition(
            this.tilePos.x * TILE_SIZE + offsetX,
            this.tilePos.y * TILE_SIZE + offsetY,
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
        InteractionsHandler.handleInteraction(this.interactionPool);
    }

    endInteraction() {
        gameState.state = GameState.explorationState;
    }
}
