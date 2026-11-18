class BulletScene04 extends Phaser.Scene {
    constructor() {
        super({
            key: `BulletScene04`
        });
        this.state = "dialogue";
        this.dialogueText = [];
        this.movementPoints = [];
        this.storedMovementPoints = [];
        this.stars = [];
        this.starsTrails = [];
    }
    bullets;
    enemy;
    enemyBullets;
    enemyFiring;
    enemyMoving;
    plasma;
    avatar;
    // stars;
    text;

    create() {
        // Creates the Background
        // this.stars = this.add.blitter(0, 0, 'starfield');
        // this.stars.create(0, 0);
        // this.stars.create(0, -512);

        // Creates the the player avatar and his collisions
        this.avatar = this.physics.add.sprite(200, 350, `playerCharacterIdle`);
        this.avatar.scale = 1;
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(140, 140);
        this.avatar.lifePoints = 3;

        // Create the basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Initiates the character's animations
        this.avatar.play('idle animation');
        this.walk = false;

        // Creates the Bullets that will be fired
        this.bullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullets' })
        );
        this.bullets.createMultiple({
            key: 'marisaProjectile',
            quantity: 5
        });

        this.enemyBullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'enemyBullets' })
        );
        this.enemyBullets.createMultiple({
            key: 'enemyBullet',
            quantity: 5
        });

        this.enemyBigBullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'enemyBigBullets' })
        );
        this.enemyBigBullets.createMultiple({
            key: 'enemyBigBullet',
            quantity: 5
        });

        // Sets up the player's camera
        this.cameras.main.setSize(800, 800);
        // this.cameras.main.startFollow(this.avatar, 1, 1);
        // this.cameras.main.setZoom(3);
        this.cameras.main.setBounds(0, 0, 800, 800);


        // Creates the pixelated transition & visual effect when exiting the title screen and entering the game
        const fxCamera = this.cameras.main.postFX.addPixelate(10);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });

        // Sets the bounds of the world
        this.physics.world.setBounds(0, 0, 800, 800);
        this.avatar.setCollideWorldBounds(true);


        // creates the enemey and makes him move and fire
        this.enemy = this.physics.add.sprite(256, 128, 'enemy', 1);
        this.enemy.setBodySize(160, 64);
        // Hit points
        this.enemy.state = 5;

        this.enemyMoving = this.tweens.add({
            targets: this.enemy.body.velocity,
            props: {
                x: { from: 150, to: -150, duration: 4000 },
                y: { from: 50, to: -50, duration: 2000 }
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Makes the enemy fire bullets
        // this.enemyFiring = this.time.addEvent({
        //     delay: 750,
        //     loop: true,
        //     callback: () => {
        //         this.enemyBullets.fire(this.enemy.x, this.enemy.y + 32, 0, 150);
        //     }
        // });

        // Creates the hit effects
        this.plasma = this.add.particles(0, 0, 'marisaProjectile', {
            alpha: { start: 1, end: 0, ease: 'Cubic.easeIn' },
            blendMode: Phaser.BlendModes.SCREEN,
            frequency: -1,
            lifespan: 500,
            radial: false,
            scale: { start: 1, end: 5, ease: 'Cubic.easeOut' }
        });

        this.text = this.add.text(0, 480, '', {
            font: '16px monospace',
            fill: 'aqua'
        });

        // Handles the collisions between the player, the enemy and the projectiles
        this.physics.add.overlap(this.enemy, this.bullets, (enemy, bullet) => {
            const { x, y } = bullet.body.center;

            enemy.state -= 1;
            bullet.disableBody(true, true);
            // this.plasma.setSpeedY(0.2 * bullet.body.velocity.y).emitParticleAt(x, y);
            this.plasma.emitParticleAt(x, y);

            if (enemy.state <= 0) {
                enemy.setFrame(3);
                enemy.body.checkCollision.none = true;
                // this.enemyFiring.remove();
                this.enemyMoving.stop();
            }
        });

        this.physics.add.overlap(this.avatar, this.enemyBullets, (avatar, bullet) => {
            const { x, y } = bullet.body.center;

            bullet.disableBody(true, true);
            // this.plasma.setSpeedY(0.2 * bullet.body.velocity.y).emitParticleAt(x, y);
            this.plasma.emitParticleAt(x, y);
            this.avatar.lifePoints -= 1;

            // if (avatar.lifePoints <= 0) {

            // };
        });

        this.physics.add.overlap(this.avatar, this.enemyBigBullets, (avatar, bullet) => {
            const { x, y } = bullet.body.center;

            bullet.disableBody(true, true);
            // this.plasma.setSpeedY(0.2 * bullet.body.velocity.y).emitParticleAt(x, y);
            this.plasma.emitParticleAt(x, y);
            this.avatar.lifePoints -= 1;

            // if (avatar.lifePoints <= 0) {

            // };
        });

        // Creates the points where the enemy will fire bullets from and guide bullets to
        for (let i = 0; i < 60; i++) {
            const point = this.add.circle(Phaser.Math.Between(30, 770), Phaser.Math.Between(60, 730), 2, 0x00ff00);
            this.movementPoints.push(point);
        }

        // Makes the enemy create bullets at the points
        for (let i = 0; i < 10; i++) {
            const star = this.physics.add.sprite(this.movementPoints[i].x, this.movementPoints[i].y, 'star');
            this.stars.push(star);
        }

        this.enemyStarsMovement = this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                for (let i = 0; i < this.stars.length; i++) {
                    let movementPoint = this.movementPoints[Phaser.Math.Between(0, this.movementPoints.length - 1)];
                    for (let j = 0; j < this.movementPoints.length; j++) {
                        if (this.storedMovementPoints[j] === movementPoint) {
                            movementPoint = this.movementPoints[Phaser.Math.Between(0, this.movementPoints.length - 1)];
                        }
                        else {
                            this.tweens.add({
                                targets: this.stars[i],
                                props: {
                                    x: { from: this.stars[i].x, to: movementPoint.x, duration: 2000 },
                                    y: { from: this.stars[i].y, to: movementPoint.y, duration: 2000 }
                                },
                                ease: 'Sine.easeInOut',
                                yoyo: false,
                                repeat: 0
                            });
                            this.storedMovementPoints.push(movementPoint);
                            j == 0;
                        }
                    }

                    for (let i = 0; i < 2; i++) {

                        const starBullet = this.physics.add.sprite(this.stars[i].x, this.stars[i].y, 'bullet');
                        // followingBullet.setBounce(1);
                        // followingBullet.setCollideWorldBounds(true);
                        starBullet.setVelocity(this.stars[i].x - movementPoint.x, this.stars[i].y - movementPoint.y);
                        this.starsTrails.push(starBullet);

                        this.physics.add.overlap(this.avatar, starBullet, (avatar, starBullet) => {
                            const { x, y } = starBullet.body.center;

                            starBullet.disableBody(true, true);
                            // this.plasma.setSpeedY(0.2 * bullet.body.velocity.y).emitParticleAt(x, y);
                            this.plasma.emitParticleAt(x, y);
                            this.avatar.lifePoints -= 1;

                            // if (avatar.lifePoints <= 0) {

                            // };
                        });
                    };

                    if (i == this.stars.length - 1) {
                        this.storedMovementPoints = [];
                    }
                }
            }
        });

        // this.enemyStarsFiring = this.time.addEvent({
        //     delay: 2000,
        //     loop: true,
        //     callback: () => {
        //         for (let i = 0; i < this.stars.length; i++) {
        //             this.enemyBullets.fire(this.stars[i].x, this.stars[i].y, 0, 150);
        //         }
        //     }
        // });


        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.onWorldBounds();
        });

        this.input.on('pointerdown', () => {
            this.bullets.fire(this.avatar.x, this.avatar.y, 0, -300);
        });

    }

    update() {
        if (this.avatar.lifePoints >= 0) {
            this.handleInput();
        };
        // this.generate()
        this.controlBullets();

        // this.stars.y += 1;
        // this.stars.y %= 512;

        this.text.setText([this.bullets.poolInfo(), this.enemyBullets.poolInfo()]);

    }

    generate() {
        let next = "";
        for (let i = 0; i < this.current.length; i++) {
            let c = this.current.charAt(i);

            if (c === "A") {
                next += "AB";
            } else if (c === "B") {
                next += "A";
            }

        }
        this.current = next;

    }

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

    // Controls the movement of bullets fired by both the player and the enemy
    controlBullets() {

        // Creates an array containing the bullets fired by the player and controls their behavior
        const bulletControl = this.bullets.getChildren();
        bulletControl.forEach(bulletControl => {
            if (bulletControl.active) {
                if (bulletControl.x >= 400) {
                    bulletControl.setVelocityX(20);
                }
                else {
                    bulletControl.setVelocityX(-20);
                }

                // const particles = this.emitter.overlap(bulletControl.body);
                // if (particles.length > 0) {
                //     particles.forEach(particle => {

                //         this.explode.emitParticleAt(particle.x, particle.y);

                //         particle.kill();
                //     });
                //     bulletControl.kill();
                // }
            }
        });

        // Creates an array containing the bullets fired by the enemy and controls their behavior
        const enemyBulletControl = this.enemyBullets.getChildren();
        enemyBulletControl.forEach(enemyBulletControl => {
            if (enemyBulletControl.active) {
                if (enemyBulletControl.x >= 400) {
                    enemyBulletControl.setVelocityX(20);
                }
                else {
                    enemyBulletControl.setVelocityX(-20);
                }

                if (enemyBulletControl.y <= 400) {
                    enemyBulletControl.setVelocityY(300);
                }
                else {
                    enemyBulletControl.setVelocityY(150);
                }
            }
        });

        // Creates an array containing the bigger bullets fired by the enemy and controls their behavior
        const enemyBigBulletControl = this.enemyBigBullets.getChildren();
        enemyBigBulletControl.forEach(enemyBigBulletControl => {
            if (enemyBigBulletControl.active) {
                let dynamicVelocityX = 0;
                if (enemyBigBulletControl.x >= 400) {
                    dynamicVelocityX -= 2;
                    enemyBigBulletControl.setVelocityX(dynamicVelocityX);
                }
                else {
                    dynamicVelocityX += 2;
                    enemyBigBulletControl.setVelocityX(dynamicVelocityX);
                }

                if (enemyBulletControl.y <= 400) {
                    enemyBigBulletControl.setVelocityY(300);
                }
                else {
                    enemyBigBulletControl.setVelocityY(150);
                }
            }
        });
    }

}

