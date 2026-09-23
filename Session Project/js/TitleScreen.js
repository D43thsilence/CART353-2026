class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `TitleScreen`
        });
    }

    create() {

        // Creates style objects to define what the text will look like
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            fill: `#ffffff`,
        };

        let style2 = {
            fontFamily: `sans-serif`,
            fontSize: `13px`,
            fill: `#ffffff`,
        };

        let style3 = {
            fontFamily: `sans-serif`,
            fontSize: `11.5px`,
            fill: `#ffffff`,
        };

        // Adds the background of the title screen
        this.add.sprite(200, 160, `titleScreen`)

        // Creates text strings used in the title screen
        let gameDescription = `Dungeon Crasher!`;
        let gameInstructions = `Use the WASD keys to guide the movement of the knight`;
        let gameInstructions2 = `Your objective: defeat as many enemies as possible by colliding into them!`;
        let startInstruction = `Click to start!`;

        // Draws the text on the Title Screen
        this.gameText = this.add.text(width / 2.6, height / 2.6, gameDescription, style);
        this.gameText = this.add.text(width / 2.8, height / 0.7, gameInstructions, style2);
        this.gameText = this.add.text(width / 7.6, height / 0.5, gameInstructions2, style3);
        this.gameText = this.add.text(width / 0.62, height / 0.38, startInstruction, style2);

        // Switches the scene to the Play scene on mouse click
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }

    update() {

    }
}
