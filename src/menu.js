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

        // this.pages = this.createPages(this.scene, {});

        this.parentContainer.add(this.mainPanel);

        // this.mainPanel.addBackground(this.scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY))
        this.mainPanel.layout();
        this.mainPanel.drawBounds(scene.add.graphics(), 0xff0000);   // Comment out to get rid of sizer outline
        this.mainPanel.hide();


        this.mainPanel.getElement('pages')
            .on('pageinvisible', function (page, key, pages) {
                console.log('Set page \'' + key + '\' invisible');
            })
            .on('pagevisible', function (page, key, pages) {
                console.log('Set page \'' + key + '\' visible');
            });

        this.mainPanel.getElement('buttons').emitButtonClick(0);
    }

    createMainPanel(scene, config) {
        var keys = ['Text', 'STable'];
        var buttons = this.createButtons(scene, keys);
        var pages = this.createPages(scene, keys);
        var mainPanel = scene.rexUI.add.sizer(config);
        mainPanel.add(buttons, 0, "top", 0, false);
        mainPanel.add(pages, 1, "center", 0, true);

        var prevButton = undefined;
        buttons.on('button.click', function (button) {
            if (button === prevButton) {
                return;
            }
            button.getElement('background').setFillStyle(COLOR_PRIMARY);
            if (prevButton) {
                prevButton.getElement('background').setFillStyle(COLOR_DARK);
            }
            prevButton = button;
    
            pages.swapPage(button.text);
        });

        mainPanel.addChildrenMap("buttons", buttons);
        mainPanel.addChildrenMap("pages", pages);

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

    createPages(scene, keys) {
        var pages = scene.rexUI.add.pages({
            space: { left: 20, right: 20, top: 20, bottom: 20 }
        });
        pages.addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY));

        var createPageCallback = {
            Text: this.createTextPage,
            STable: this.createSTablePage,
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            pages.addPage(
                createPageCallback[key](scene),
                key
            )
        }

        return pages;
    }

    createTextPage(scene) {
        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
        var CreateContent = function (linesCount) {
            var numbers = [];
            for (var i = 0; i < linesCount; i++) {
                numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
            }
            return content + '\n' + numbers.join('\n');
        }
    
        return scene.rexUI.add.textArea({
            // text: this.add.text(),
            text: scene.rexUI.add.BBCodeText(),
    
            slider: {
                track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },
    
            space: {
                text: 10,
            },
    
            content: CreateContent(100),
        })
    }

    createSTablePage(scene) {
        var CreateItem = function (scene, colIdx, rowIdx) {
            var text = colIdx + ',' + rowIdx;
            return scene.rexUI.add.label({
                height: 60,
    
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined)
                    .setStrokeStyle(2, COLOR_LIGHT, 1),
                text: scene.add.text(0, 0, text, {
                    fontSize: 18
                }),
                icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, Phaser.Math.Between(0, 0xffffff)),
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
    
                    icon: 10,
                }
            });
        }
    
        var CreateGrid = function (scene, col, row) {
            var sizer = scene.rexUI.add.gridSizer({
                column: col,
                row: row,
    
                columnProportions: 1,
            })
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {
                    sizer.add(
                        CreateItem(scene, i, j), // child
                        i, // columnIndex
                        j, // rowIndex
                        'center', // align
                        0, // paddingConfig
                        true, // expand
                    )
                }
            }
    
            return sizer;
        }
    
        return scene.rexUI.add.scrollablePanel({
            scrollMode: 0,
    
            panel: {
                child: CreateGrid(scene, 3, 20),
                mask: {
                    mask: true,
                    padding: 1,
                }
            },
    
            slider: {
                track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },
    
            space: {
                panel: 10,
            }
        })
    }

    createLabelPage(scene) {
        return scene.rexUI.add.label({
            text: scene.add.text(0, 0, 'Label', {
                fontSize: '18pt'
            }),
        })
    }

    showMenu() {
        this.mainPanel.show();
    }

    hideMenu() {
        this.mainPanel.hide();
    }

    menuPageUp() {
        const pages = this.mainPanel.getElement("pages");
        const currentPageIndex = pages.keys.indexOf(pages.currentKey);
        if (currentPageIndex > 0) {
            pages.swapPage(pages.keys[currentPageIndex - 1]);
        }
    }

    menuPageDown() {
        const pages = this.mainPanel.getElement("pages");
        const currentPageIndex = pages.keys.indexOf(pages.currentKey);
        if (currentPageIndex < pages.keys.length - 1) {
            pages.swapPage(pages.keys[currentPageIndex + 1]);
        }
    }
}