class BulletScene03 extends Phaser.Scene {
    constructor() {
        super({
            key: `BulletScene03`
        });
        this.followerBullets = [];
        this.state = "dialogue";
        this.dialogueText = [];
    }
    bullets;
    enemy;
    enemyBullets;
    enemyFiring;
    enemyMoving;
    plasma;
    avatar;
    stars;
    text;

    create() {
        // Creates the Background
        this.stars = this.add.blitter(0, 0, 'starfield');
        this.stars.create(0, 0);
        this.stars.create(0, -512);

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

        // // Makes the enemy fire bullets
        // this.enemyFiring = this.time.addEvent({
        //     delay: 750,
        //     loop: true,
        //     callback: () => {
        //         if (this.state === "gameplay") {
        //             this.enemyBullets.fire(this.enemy.x, this.enemy.y + 32, 0, 150);
        //         }
        //     }
        // });

        // // Makes the enemy fire bigger bullets
        // this.enemyBigFiring = this.time.addEvent({
        //     delay: 550,
        //     loop: true,
        //     callback: () => {
        //         if (this.state === "gameplay") {
        //             this.enemyBigBullets.fire(this.enemy.x, this.enemy.y + 32, 0, 150);
        //         }
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
                this.enemyFiring.remove();
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

        this.time.addEvent({
            delay: 1550,
            loop: true,
            callback: () => {
                for (let i = 0; i < 4; i++) {
                    if (this.state === "gameplay") {
                        const followingBullet = this.physics.add.sprite(this.enemy.x, this.enemy.y, 'bullet');
                        // followingBullet.setBounce(1);
                        // followingBullet.setCollideWorldBounds(true);
                        // followingBullet.setVelocity(this.enemy.x - followingBullet.x + Phaser.Math.Between(-5, 5), this.enemy.y - followingBullet.y + Phaser.Math.Between(-5, 5));
                        this.followerBullets.push(followingBullet);

                        this.physics.add.overlap(this.avatar, followingBullet, (avatar, followingBullet) => {
                            const { x, y } = followingBullet.body.center;

                            followingBullet.disableBody(true, true);
                            // this.plasma.setSpeedY(0.2 * bullet.body.velocity.y).emitParticleAt(x, y);
                            this.plasma.emitParticleAt(x, y);
                            this.avatar.lifePoints -= 1;

                            // if (avatar.lifePoints <= 0) {

                            // };
                        });
                    }
                };
            }
        });

        this.time.addEvent({
            delay: 1550,
            loop: true,
            callback: () => {
                for (let i = 0; i < this.followerBullets.length; i++) {
                    this.followerBullets[i].setVelocity(this.enemy.x - this.followerBullets[i].x + Phaser.Math.Between(-20, 20), this.enemy.y - this.followerBullets[i].y + Phaser.Math.Between(-20, 20));
                }
            }
        });





        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.onWorldBounds();
        });

        this.input.on('pointerdown', () => {
            if (this.state === "gameplay") {
                this.bullets.fire(this.avatar.x, this.avatar.y, 0, -300);
            }
            this.state = "gameplay";
        });
    }

    update() {
        if (this.avatar.lifePoints >= 0) {
            this.handleInput();
        };

        this.controlBullets();

        // this.stars.y += 1;
        // this.stars.y %= 512;

        this.text.setText([this.bullets.poolInfo(), this.enemyBullets.poolInfo()]);
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

        for (let i = 0; i < this.followerBullets.length; i++) {
            // this.followerBullets[i].setVelocity(this.enemy.x - this.followerBullets[i].x + Phaser.Math.Between(-200, 200), this.enemy.y - this.followerBullets[i].y + Phaser.Math.Between(-200, 200));
            // if (this.followerBullets[i].active) {
            //     let dynamicVelocityX = 0;
            //     if (this.followerBullets[i].x >= 400) {
            //         dynamicVelocityX -= 2;
            //         this.followerBullets[i].setVelocityX(dynamicVelocityX);
            //     }
            //     else {
            //         dynamicVelocityX += 2;
            //         this.followerBullets[i].setVelocityX(dynamicVelocityX);
            //     }

            //     if (this.followerBullets[i].y <= 400) {
            //         this.followerBullets[i].setVelocityY(300);
            //     }
            //     else {
            //         this.followerBullets[i].setVelocityY(150);
            //     }
            // }
        }
    }
}

