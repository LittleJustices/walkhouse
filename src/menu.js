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
        var mainPanel = scene.rexUI.add.sizer(config);

        return mainPanel;
    }

    createPages(scene, config) {
        var pages = scene.rexUI.add.pages(config);
        pages.addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY));
        pages.addPage(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_LIGHT), "page");

        return pages;
    }

    showMenu() {
        this.mainPanel.show();
    }

    hideMenu() {
        this.mainPanel.hide();
    }
}