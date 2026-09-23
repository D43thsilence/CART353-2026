class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    // Preloads all assets
    preload() {
        // Creates a loading bar
        const progress = this.add.graphics();

        this.load.on('progress', value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });

        // Loads the images and sprite sheets
        this.load.setPath('assets/images/');
        // this.load.image(`titleScreen`, `Title Screen background.png`);
        // this.load.image(`endScreen`, `End Screen background.png`);
        // this.load.image(`tiles`, `Dungeon_01 Tileset.png`);
        this.load.spritesheet(`playerCharacterIdle`, `Aya_Ground_Idle.png`, {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 11
        });
        this.load.spritesheet(`playerCharacterMove`, `Aya_Ground_Walk.png`, {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 16
        });
        // this.load.tilemapTiledJSON(`dungeon`, `Dungeon_01.tmj`)

        // Switches to the next scene
        this.load.on(`complete`, () => {
            // Switch to the Play scene
            this.scene.start(`Play`);
        });
    }

    create() {
        const keys = this.textures.getTextureKeys();

        for (let i = 0; i < keys.length; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 600);

            this.add.image(x, y, keys[i]);
        }

        this.createAnimations();
    }

    // Creates the animations
    createAnimations() {
        this.anims.create({
            key: 'idle animation',
            frames: this.anims.generateFrameNumbers(`playerCharacterIdle`, { start: 0, end: 10, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run animation',
            frames: this.anims.generateFrameNumbers(`playerCharacterMove`, { start: 0, end: 14, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'lizard idle',
        //     frames: this.anims.generateFrameNumbers(`lizardIdle`, { start: 0, end: 3, first: 0 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    }

    update() {

    }
}
