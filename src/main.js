const CANVAS_WIDTH = 800; // 720;
const CANVAS_HEIGHT = 600; // 528;
const TEXTBOX_OFFSET = 10;
const TILE_SIZE = 16;

const GetValue = Phaser.Utils.Objects.GetValue;

var config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    scene: [
        new LoadScene(),
        new HouseScene({sceneTitle: "house", transitionTarget: "memory", actorKeys: HOUSE_ACTORS}),
        new HouseScene({sceneTitle: "memory", transitionTarget: "house", actorKeys: MEMORY_ACTORS}),
        new InputsScene(),
        new GUIScene()
    ]
    // loader: For later, when we start using real assets
    // plugin: Load plugins properly here
    // title: For the console when the game is done
    // url: ditto
};

var game = new Phaser.Game(config);
const gameState = new GameState(GameState.explorationState);
const inputHandler = new InputHandler();
var dialogueBox;
