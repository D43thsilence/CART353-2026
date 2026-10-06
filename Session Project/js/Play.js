class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `Play`
        });
    }

    create() {
        // // Creates the stage where the game is played
        // const map = this.make.tilemap({ key: `dungeon` });
        // const tileset = map.addTilesetImage(`Dungeon_01 Tileset`, `tiles`);
        // const backgroundColorLayer = map.createLayer('Bottomless Pit', tileset, 0, 0);
        // const backgroundLowerWalls = map.createLayer('Lower Walls Extra', tileset, 0, 0);
        // const backgroundWalls = map.createLayer('Lower Walls', tileset, 0, 0);
        // const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        // const wallsLayer = map.createLayer('Walls', tileset, 0, 0)

        // // Creates the level's collisions
        // wallsLayer.setCollisionByProperty({ collides: true })
        // groundLayer.setCollisionByProperty({ collides: true })
        // backgroundWalls.setCollisionByProperty({ collides: true })
        // backgroundLowerWalls.setCollisionByProperty({ collides: true })
        // backgroundColorLayer.setCollisionByProperty({ collides: true })

        // Creates the the player avatar and his collisions
        this.avatar = this.physics.add.sprite(88, 115, `playerCharacterIdle`);
        this.avatar.scale = 1;
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(140, 140);
        // this.physics.add.collider(this.avatar, wallsLayer);
        // this.physics.add.collider(this.avatar, groundLayer);
        // this.physics.add.collider(this.avatar, backgroundWalls);
        // this.physics.add.collider(this.avatar, backgroundLowerWalls);
        // this.physics.add.collider(this.avatar, backgroundColorLayer);

        // Initiates the character's animations
        this.avatar.play('idle animation');
        this.walk = false;

        // Creates the variables that count how many enemies are onscreen and how many enemies can be onscreen at once
        // this.spawnedEnemies = 0
        // this.maxEnemyCount = 4

        // // Sets up the display of the player's score
        // let style = {
        //     fontFamily: `sans-serif`,
        //     fontSize: `12px`,
        //     fill: `#ffffff`,
        // };
        // this.score = 0
        // this.scoreText = this.add.text(88, 78, 'Score = 0', style);

        // Create the basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Sets up the various cameras in the game
        this.cameras.main.setSize(800, 800);
        this.cameras.main.startFollow(this.avatar, 1, 1);
        this.cameras.main.setZoom(3);
        // this.cam2 = this.cameras.add(200, 0, 200, 160);
        // this.cam3 = this.cameras.add(0, 160, 200, 160);
        // this.cam4 = this.cameras.add(200, 160, 200, 160);

        this.cameras.main.setBounds(0, 0, 800, 800);
        // this.cam2.setBounds(690, 60, 800, 640);
        // this.cam3.setBounds(70, 750, 800, 640);
        // this.cam4.setBounds(690, 750, 800, 640);

        // Creates the pixelated transition & visual effect when exiting the title screen and entering the game
        const fxCamera = this.cameras.main.postFX.addPixelate(10);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
        // const fxCamera2 = this.cam2.postFX.addPixelate(40);
        // this.add.tween({
        //     targets: fxCamera2,
        //     duration: 700,
        //     amount: -1,
        // });
        // const fxCamera3 = this.cam3.postFX.addPixelate(40);
        // this.add.tween({
        //     targets: fxCamera3,
        //     duration: 700,
        //     amount: -1,
        // });
        // const fxCamera4 = this.cam4.postFX.addPixelate(40);
        // this.add.tween({
        //     targets: fxCamera4,
        //     duration: 700,
        //     amount: -1,
        // });

        // Sets the bounds of the world
        this.physics.world.setBounds(0, 0, 800, 800);
        this.avatar.setCollideWorldBounds(true);

        // Creates the particles
        // this.add.particles(40, 40, 'idle animation'), {
        //     speed: 100,
        //     lifespan: 3000,
        //     gravityY: 0.18
        // }

        // Stroke Circle example
        // this.graphics = this.add.graphics({ lineStyle: { color: 0x00ff00 } });
        // let circle = new Phaser.Geom.Circle(400, 300, 0);
        // this.circles = [circle];
        // for (let i = 0; i < 80; i++) {
        //     circle = Phaser.Geom.Circle.Clone(circle);
        //     circle.radius += 1;
        //     Phaser.Geom.Circle.CircumferencePoint(circle, i / 20 * Phaser.Math.PI2, circle);
        //     this.circles.push(circle);
        // }

        this.input.on('pointerdown', () => {
            this.scene.start('BulletScene01');
        });
    }


    // Continuously checks for player input and manages the number of enemies and when/where to spawn them
    update() {
        this.handleInput();
    }

    // destroyEnemy(playerCharacter, enemy) {
    //     enemy.destroy();
    //     this.spawnedEnemies = this.spawnedEnemies - 1;
    //     this.score = this.score += 1
    //     this.scoreText.setText('Score: ' + this.score)
    // this.physics.add.overlap(this.avatar, this.particles[i], this.destroyEnemy, null, this);
    // }

    handleInput() {
        // Handles player 1's movement and plays the walking animation
        this.input.keyboard.on('keydown', event => {

            if (event.keyCode === 87) {
                this.walk = true;
                this.avatar.setGravityY(-this.avatar.speed);
            }
            else if (event.keyCode === 83) {
                this.walk = true;
                this.avatar.setGravityY(this.avatar.speed);
            }

            else if (event.keyCode === 65) {
                this.walk = true;
                this.avatar.setGravityX(-this.avatar.speed);
            }

            else if (event.keyCode === 68) {
                this.walk = true;
                this.avatar.setGravityX(this.avatar.speed);
            }
            if (this.avatar.anims.getName() === 'idle animation') {
                this.avatar.play('run animation');
            };
        });

        // Makes player 1 stop moving when the movement keys are released and plays the idle animation
        this.input.keyboard.on('keyup', event => {

            if (event.keyCode === 87) {
                this.walk = false;
                this.avatar.setGravityY(0);
                this.avatar.setVelocityY(0);
            }
            else if (event.keyCode === 83) {
                this.walk = false;
                this.avatar.setGravityY(0);
                this.avatar.setVelocityY(0);
            }

            else if (event.keyCode === 65) {
                this.walk = false;
                this.avatar.setGravityX(0);
                this.avatar.setVelocityX(0);
            }

            else if (event.keyCode === 68) {
                this.walk = false;
                this.avatar.setGravityX(0);
                this.avatar.setVelocityX(0);
            }

            if (this.avatar.anims.getName() === 'run animation') {
                this.avatar.play('idle animation');
            };
        });
    }
}
