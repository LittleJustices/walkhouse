const Vector2 = Phaser.Math.Vector2;

class GridPhysics {
    constructor(actors, map) {
        this.actors = actors;
        this.map = map;
    }

    addActor(actor) {
        this.actors.push(actor);
    }

    movePlayer(direction) {
        this.moveActor(this.actors[0], direction);
    }

    moveActor(actor, direction) {
        actor.lastMovementIntent = direction;
        if (actor.isMoving()) {
            return;
        }
        if (this.interactableInDirection(actor, direction)) {
            if (actor.isPlayer) {
                this.startInteraction(actor, direction);
            }
            return;
        }
        if (this.isBlockingDirection(actor, direction)) {
            return;
        } else {
            this.startMoving(actor, direction);
        }
    }

    startMoving(actor, direction) {
        actor.movementDirection = direction;
        this.updateActorTilePos(actor);
    }

    startInteraction(actor, direction) {
        const interactable = this.map.getObjectAtPosition(this.tilePosInDirection(actor, direction));
        interactable.startInteraction();
    }

    update(delta) {
        this.actors.forEach((actor) => {
            if (actor.isMoving()) {
                this.updateActorPosition(actor, delta);
            }
            actor.lastMovementIntent = DIRECTION.NONE;
        })
    }

    updateActorPosition(actor, delta) {
        const pixelsToWalkThisUpdate = this.getPixelsToWalkThisUpdate(actor, delta);
        if (!this.willCrossTileBorderThisUpdate(actor, pixelsToWalkThisUpdate)) {
            this.moveActorSprite(actor, pixelsToWalkThisUpdate);
        } else if (this.shouldContinueMoving(actor)) {
            this.moveActorSprite(actor, pixelsToWalkThisUpdate);
            this.updateActorTilePos(actor);
        } else {
            this.moveActorSprite(actor, TILE_SIZE - actor.tileSizePixelsWalked);
            this.stopMoving(actor);
        }
    }

    updateActorTilePos(actor) {
        this.map.deleteObject(actor);
        actor.setTilePos(
            actor
                .getTilePos()
                .add(this.getDirectionVector(actor.movementDirection))
        );
        this.map.addObject(actor);
    }

    moveActorSprite(actor, pixelsToMove) {
        const directionVector = this.getDirectionVector(actor.movementDirection).clone();
        const movementDistance = directionVector.multiply(
            new Vector2(pixelsToMove)
        );
        const newPlayerPosition = actor.getPosition().add(movementDistance);
        actor.setPosition(newPlayerPosition);
        actor.tileSizePixelsWalked += pixelsToMove;
        actor.tileSizePixelsWalked %= TILE_SIZE;
    }

    getPixelsToWalkThisUpdate(actor, delta) {
        const deltaInSeconds = delta / 1000;
        return actor.speedPixelsPerSecond * deltaInSeconds;
    }

    getDirectionVector(direction) {
        switch (direction) {
            case DIRECTION.UP:
                return Vector2.UP;
                break;
            case DIRECTION.TOPRIGHT:
                return new Vector2(1, -1);
            case DIRECTION.RIGHT:
                return Vector2.RIGHT;
                break;
            case DIRECTION.BOTTOMRIGHT:
                return new Vector2(1, 1);
            case DIRECTION.DOWN:
                return Vector2.DOWN;
                break;
            case DIRECTION.BOTTOMLEFT:
                return new Vector2(-1, 1);
            case DIRECTION.LEFT:
                return Vector2.LEFT;
                break;
            case DIRECTION.TOPLEFT:
                return new Vector2(-1, -1)
        
            default:
                return Vector2.ZERO;
                break;
        }
    }

    stopMoving(actor) {
        actor.movementDirection = DIRECTION.NONE;
    }

    willCrossTileBorderThisUpdate(actor, pixelsToWalkThisUpdate) {
        return actor.tileSizePixelsWalked + pixelsToWalkThisUpdate >= TILE_SIZE;
    }

    shouldContinueMoving(actor) {
        return (
            actor.movementDirection == actor.lastMovementIntent &&
            !this.isBlockingDirection(actor, actor.lastMovementIntent) &&
            !this.interactableInDirection(actor, actor.lastMovementIntent)
        );
    }

    interactableInDirection(actor, direction) {
        return this.map.hasObjectAtPosition(this.tilePosInDirection(actor, direction));
    }

    isBlockingDirection(actor, direction) {
        return this.hasBlockingTile(this.tilePosInDirection(actor, direction));
    }

    tilePosInDirection(actor, direction) {
        return actor.getTilePos().add(this.getDirectionVector(direction));
    }

    hasBlockingTile(pos) {
        if (this.hasNoTile(pos)) {
            return true;
        }
        return this.map.backdropMap.layers.some((layer) => {
            const tile = this.map.backdropMap.getTileAt(pos.x, pos.y, false, layer.name);
            return tile && tile.properties.collides;
        })
    }

    hasNoTile(pos) {
        let noTile = true;
        this.map.backdropMap.layers.forEach(layer => {
            if (this.map.backdropMap.hasTileAt(pos.x, pos.y, layer.name)) {
                noTile = false;
            }
        });
        return noTile;
        //     console.log(this.tileMap.layers.some(layer => {
        //         console.log(layer.name)
        //         console.log(this.tileMap.hasTileAt(pos.x, pos.y, layer.name));
        //         this.tileMap.hasTileAt(pos.x, pos.y, layer.name)
        //     }));
        // return !this.tileMap.layers.some((layer) => {
        //     this.tileMap.hasTileAt(pos.x, pos.y, layer.name);
        // })
    }
}