class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `Play`
        });
        this.particles = [];
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
        this.avatar = this.physics.add.sprite(400, 700, `playerCharacterIdle`);
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

        // Sets up the display of the player's score
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `12px`,
            fill: `#ffffff`,
        };
        this.score = 0
        this.scoreText = this.add.text(88, 78, 'Score = 0', style);

        // Create the basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Sets up the various cameras in the game
        this.cameras.main.setSize(800, 800);
        this.cameras.main.startFollow(this.avatar, 1, 1);
        // this.cameras.main.setZoom(3);
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

        // this.emitter = this.add.particles(100, 100, 'marisaProjectile', {
        //     angle: { min: 240, max: 300 },
        //     speed: { min: 200, max: 300 },
        //     lifespan: 4000,
        //     gravityY: 180,
        //     quantity: 2,
        //     bounce: 0.4,
        //     // bounds: new Phaser.Geom.Rectangle(-100, -200, 1000, 750)
        // });
        // this.emitter.particleBringToTop = false;
        // this.emitter.enableFilters();
        // this.emitter.filters.external.addBokeh(0.5, 10, 0.2)

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

        // Creates the transition areas that lead to the other scenes
        // this.input.on('pointerdown', () => {
        //     this.scene.start('BulletScene01');
        // });

        this.avatar.body.onOverlap = true;

        const transitionBox = this.physics.add.image(100, 500, 'marisaProjectile');

        const transitionBox2 = this.physics.add.image(200, 300, 'marisaProjectile');

        const transitionBox3 = this.physics.add.image(400, 200, 'marisaProjectile');

        const transitionBox4 = this.physics.add.image(600, 300, 'marisaProjectile');

        const transitionBox5 = this.physics.add.image(700, 500, 'marisaProjectile');

        // const transitionBoxes = this.physics.add.staticGroup({
        //     key: 'marisaProjectile',
        //     frameQuantity: 10
        // });

        // Phaser.Actions.PlaceOnRectangle(
        //     transitionBoxes.getChildren(),
        //     new Phaser.Geom.Rectangle(84, 84, 616, 416)
        // );

        // transitionBoxes.refresh();

        this.physics.add.overlap(this.avatar, transitionBox);
        this.physics.add.overlap(this.avatar, transitionBox2);
        this.physics.add.overlap(this.avatar, transitionBox3);
        this.physics.add.overlap(this.avatar, transitionBox4);
        this.physics.add.overlap(this.avatar, transitionBox5);
        // this.physics.add.overlap(this.avatar, transitionBoxes);

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) => {
            if (gameObject2 == transitionBox) {
                this.scene.start('BulletScene01');
            }
            if (gameObject2 == transitionBox2) {
                this.scene.start('BulletScene02');
            }
            if (gameObject2 == transitionBox3) {
                this.scene.start('BulletScene03');
            }
            if (gameObject2 == transitionBox4) {
                this.scene.start('BulletScene04');
            }
            if (gameObject2 == transitionBox5) {
                this.scene.start('BulletScene05');
            }
            // gameObject1.setAlpha(0.5);
            // gameObject2.setAlpha(0.5);

        });

        // this.rect = this.add.rectangle(400, 300, 300, 200).setStrokeStyle(2, 0xffff00);


        // this.transitionBoxes = [];
        // for (let i = 0; i < 5; i++) {
        //     transitionBox = Phaser.Geom.Circle.Clone(circle);
        //     this.transitionBoxes.push;
        // }
        // for (let i = 0; i < 5; i++) {
        //     this.physics.add.overlap(this.avatar, this.transitionBoxes[i], this.sceneSwap, null, this);
        // }
    }


    // Continuously checks for player input
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
        // Handles player 1's movement and the size changes and attacks of both players
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

        // Makes player 1 stop moving when the movement keys are released
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
