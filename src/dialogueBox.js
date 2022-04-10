const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const ICON_WIDTH = 64;      // Hardcoded for now, figure out how to get the width dynamically once I start playing with real assets
const ACTION_WIDTH = 36;
const HORIZONTAL_PADDING = { left: 20, portraitText: 10, textAction: 10, right: 20 };
const VERTICAL_PADDING = { top: 20, nameText: 10, bottom: 20 };

class DialogueBox {
    constructor(scene) {
        this.scene = scene;
        this.sizer = scene.rexUI.add.sizer({
            orientation: 1,
            anchor: {
                left: "left+" + TEXTBOX_OFFSET.toString(),
                right: "right-" + TEXTBOX_OFFSET.toString(),
                bottom: "bottom-" + TEXTBOX_OFFSET.toString(),
                width: "100%-" + (TEXTBOX_OFFSET * 2).toString()
            }
        });
        this.sizer.addBackground(scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY));

        var subsizer = scene.rexUI.add.sizer({orientation: 0});

        this.nameField = this.createNameField(this.scene, {
            style: {font: "20px"}
        });

        this.portrait = this.scene.add.image(0, 0, "empty-portrait").setScale(0.25);

        this.textBox = this.createTextBox(this.scene, {
            fixedHeight: 65,
            outerWidth: CANVAS_WIDTH,
            padding: TEXTBOX_OFFSET,
        }).setScrollFactor(0);
        
        this.sizer.add(this.nameField, {
            align: "left",
            padding: {
                left: HORIZONTAL_PADDING.left, 
                right: HORIZONTAL_PADDING.right, 
                top: VERTICAL_PADDING.top, 
                bottom: VERTICAL_PADDING.nameText
            }
        });
        this.sizer.add(subsizer);
        subsizer.add(this.portrait, {
            align: "center",
            padding: {
                left: HORIZONTAL_PADDING.left,
                right: HORIZONTAL_PADDING.portraitText,
                top: 0,
                bottom: VERTICAL_PADDING.bottom
            }
        });
        subsizer.add(this.textBox, {
            align: "left",
            padding: {
                left: 0,
                right: HORIZONTAL_PADDING.right,
                top: 0,
                bottom: VERTICAL_PADDING.bottom
            }
        });
        this.sizer.layout();
        this.sizer.drawBounds(scene.add.graphics(), 0xff0000);   // Comment out to get rid of sizer outline
    }

    createNameField(scene, config) {
        return scene.make.text(config);
    }
    
    createTextBox(scene, config) {
        var fixedHeight = GetValue(config, 'fixedHeight', 0);
        var space = { text: HORIZONTAL_PADDING.textAction }
        var fixedWidth = CANVAS_WIDTH - 2 * TEXTBOX_OFFSET - HORIZONTAL_PADDING.left - ICON_WIDTH - HORIZONTAL_PADDING.portraitText - 
            HORIZONTAL_PADDING.textAction - ACTION_WIDTH - HORIZONTAL_PADDING.right;
        var textBox = scene.rexUI.add.textBox({
                // x: x,
                // y: y,
                anchor: {
                    left: 'left+10',
                    right: 'right-10',
                    bottom: 'bottom-10',
                },
                // width: CANVAS_WIDTH - 2 * TEXTBOX_OFFSET,
    
                // background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                    //.setStrokeStyle(2, COLOR_LIGHT),
    
                // icon: scene.add.image(0, 0, "akyuu-portrait").setScale(0.25),
    
                // text: this.getBuiltInText(scene, fixedWidth, fixedHeight),
                text: this.getBBcodeText(scene, fixedWidth, fixedHeight),
    
                action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
    
                space: space
            })
            .setOrigin(0.5)
            // .setMinSize(outerWidth, outerHeight)
            .layout();
    
        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            .on('pageend', function () {
                // if (this.isLastPage) {
                //     return;
                // }
    
                var icon = this.getElement('action').setVisible(true);
                this.resetChildVisibleState(icon);
                // icon.y -= 30;
                // var tween = scene.tweens.add({
                //     targets: icon,
                //     y: '+=30', // '+=100'
                //     ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                //     duration: 500,
                //     repeat: 0, // -1: infinity
                //     yoyo: false
                // });
            }, textBox)
        //.on('type', function () {
        //})
    
        return textBox;
    }
    
    getBuiltInText(scene, fixedWidth, fixedHeight) {
        return scene.add.text(0, 0, '', {
                fontSize: '20px',
                wordWrap: {
                    width: fixedWidth
                },
                maxLines: 3
            })
            .setFixedSize(fixedWidth, fixedHeight);
    }
    
    getBBcodeText(scene, fixedWidth, fixedHeight) {
        return scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
    
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: fixedWidth
            },
            maxLines: 3
        })
    }

    displayDialogue(name, portrait, words) {
        this.nameField.text = name;
        this.portrait.setTexture(portrait);
        this.textBox.start(words, 50);
    }

    nextPage() {
        var icon = this.textBox.getElement('action').setVisible(false);
        this.textBox.resetChildVisibleState(icon);
        if (this.textBox.isTyping) {
            this.textBox.stop(true);
        } else {
            if (this.textBox.isLastPage) {
                this.nameField.text = "";
                this.portrait.setTexture("empty-portrait");
                this.textBox.text = "";
                // refer to function that decides what to do after a piece of dialogue is over (exit or pull up next piece)
                InteractionsHandler.handleEndOfInteraction();
            } else {
                this.textBox.typeNextPage();
            }
        }
    }

    previousPage() {
        this.textBox.page.showPreviousPage();
    }
}
