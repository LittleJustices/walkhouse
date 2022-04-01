const CANVAS_WIDTH = 800; // 720;
const CANVAS_HEIGHT = 600; // 528;
const TEXTBOX_OFFSET = 10;
const TILE_SIZE = 16;

var config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    scene: [
        new HouseScene("house", LoadInfo.houseActors),
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
