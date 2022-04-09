const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const ICON_WIDTH = 64;      // Hardcoded for now, figure out how to get the width dynamically once I start playing with real assets
const ACTION_WIDTH = 36;

class DialogueBox {
    constructor(scene) {
        this.scene = scene;
        this.sizer = scene.rexUI.add.sizer({
            orientation: 1,
            anchor: {
                left: 'left+10',
                right: 'right-10',
                bottom: 'bottom-10',
            }
        });
        this.sizer.addBackground(scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY));

        this.nameField = this.sizer.add(
            scene.make.text({x: 0, y: 0, text: 'name goes here', style: {font: '20px'}}), 
            {
                align: 'left',
                padding: {left: 10, right: 10, top: 10, bottom: 10}
            }
            );

        this.textBox = this.createTextBox(this.scene, {
            fixedHeight: 65,
            outerWidth: CANVAS_WIDTH,
            padding: TEXTBOX_OFFSET,
        }).setScrollFactor(0);
        
        this.sizer.add(this.textBox);
        this.sizer.layout();
        this.sizer.drawBounds(scene.add.graphics(), 0xff0000);   // Comment out to get rid of sizer outline
    }
    
    createTextBox(scene, config) {
        var fixedHeight = GetValue(config, 'fixedHeight', 0);
        var outerWidth = GetValue(config, 'outerWidth', 0);
        var outerHeight = GetValue(config, 'outerHeight', 0);
        var padding = GetValue(config, 'padding', 0);
        var space = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10,
            text: 10,
        }
        var fixedWidth = outerWidth - 2 * padding - space.left - space.right - space.icon - space.text - ICON_WIDTH - ACTION_WIDTH;
        var textBox = scene.rexUI.add.textBox({
                // x: x,
                // y: y,
                anchor: {
                    left: 'left+10',
                    right: 'right-10',
                    bottom: 'bottom-10',
                },
                width: outerWidth - 2 * padding,
                height: outerHeight - 2 * padding,
    
                // background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                    //.setStrokeStyle(2, COLOR_LIGHT),
    
                icon: scene.add.image(0, 0, "akyuu-portrait").setScale(0.25),
    
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

    displayDialogue(content) {
        this.textBox.start(content, 50);
    }

    nextPage() {
        var icon = this.textBox.getElement('action').setVisible(false);
        this.textBox.resetChildVisibleState(icon);
        if (this.textBox.isTyping) {
            this.textBox.stop(true);
        } else {
            if (this.textBox.isLastPage) {
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
