class Interactable extends Entity {
    constructor(sprite, tilePos, scene) {
        super(sprite, tilePos, false)

        this.scene = scene;
    }

    startInteraction() {
        this.scene.state = HouseScene.interactionState;
        displayDialogue("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mi quis lobortis auctor, velit felis bibendum nisi, ut finibus sapien mauris ut eros. Phasellus aliquam venenatis ipsum, vel scelerisque tellus. Sed rutrum tortor mattis, euismod mauris vitae, porttitor velit. Maecenas rutrum ante ante, sed iaculis neque eleifend non. Aliquam erat volutpat. Proin leo eros, interdum ornare nunc ultricies, porttitor maximus nisi. Cras ut ipsum molestie, mattis augue a, cursus eros. In faucibus augue justo, vel iaculis tellus lobortis ac.");
    }

    endInteraction() {
        this.scene.state = HouseScene.explorationState;
    }
}