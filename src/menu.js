class Menu {
    constructor(scene) {
        this.scene = scene;

        this.parentContainer = this.scene.rexUI.add.sizer({});

        this.mainPanel = this.createMainPanel(this.scene, {
            height: 50,
            anchor: {
                centerX: "center",
                top: "top+10",
                width: "50%",
                height: "66%",
            }
        });

        this.pages = this.createPages(this.scene, {});

        this.parentContainer.add(this.mainPanel);

        this.mainPanel.add(this.pages, {align: "center"});

        // this.mainPanel.addBackground(this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY))
        this.mainPanel.layout();
        this.mainPanel.drawBounds(scene.add.graphics(), 0xff0000);   // Comment out to get rid of sizer outline
        this.mainPanel.hide();
    }

    createMainPanel(scene, config) {
        var keys = ['DTable', 'Text', 'STable'];
        var buttons = this.createButtons(scene, keys);
        var mainPanel = scene.rexUI.add.sizer(config);
        mainPanel.add(buttons, 0, "top", 0, false);

        return mainPanel;
    }

    createButtons(scene, keys) {
        var buttons = [];
        for (let i = 0; i < keys.length; i++) {
            buttons.push(scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
                text: scene.add.text(0, 0, keys[i], { fontSize: "18pt" }),
                space: {
                    top: 5,
                    left: 10,
                    right: 10,
                    bottom: 2,
                }
            }));
        }
        return scene.rexUI.add.buttons({
            buttons: buttons,
            orientation: "y"
        });
    }

    createPages(scene, config) {
        var pages = scene.rexUI.add.pages(config);
        pages.addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY));
        pages.addPage(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_LIGHT), "settings");
        pages.addPage(scene.rexUI.add.roundRectangle(10, 10, 20, 20, 0, COLOR_LIGHT), "credits");

        return pages;
    }

    showMenu() {
        this.mainPanel.show();
    }

    hideMenu() {
        this.pages.swapPage("credits");
        this.mainPanel.hide();
    }
}