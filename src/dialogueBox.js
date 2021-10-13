const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const ICON_WIDTH = 32;      // Hardcoded for now, figure out how to get the width dynamically once I start playing with real assets
const ACTION_WIDTH = 36;

const GetValue = Phaser.Utils.Objects.GetValue;

function displayDialogue(content) {
    dialogueBox.start(content, 50);
}

function createTextBox(scene, x, y, config) {
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
            x: x,
            y: y,
            anchor: {
                left: 'left+10',
                right: 'right-10',
                bottom: 'bottom-10',
            },
            width: outerWidth - 2 * padding,
            height: outerHeight - 2 * padding,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                //.setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 16, COLOR_DARK),

            // text: getBuiltInText(scene, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, fixedWidth, fixedHeight),

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
            if (this.isLastPage) {
                return;
            }

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

function getBuiltInText(scene, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: fixedWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

function getBBcodeText(scene, fixedWidth, fixedHeight) {
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