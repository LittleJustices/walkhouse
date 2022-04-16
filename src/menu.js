class Menu {
    constructor(scene) {
        this.scene = scene;

        this.mainPanel = this.createMainPanel(this.scene, {
            height: 50,
            anchor: {
                centerX: "center",
                top: "top+10",
                width: "50%",
                height: "66%",
            }
        });

        this.mainPanel.layout();
        this.mainPanel.drawBounds(scene.add.graphics(), 0xff0000);   // Comment out to get rid of sizer outline
        this.mainPanel.hide();
    }

    createMainPanel(scene, config) {
        var mainPanel = scene.rexUI.add.sizer(config);

        return mainPanel;
    }

    showMenu() {
        this.mainPanel.show();
    }

    hideMenu() {
        this.mainPanel.hide();
    }
}