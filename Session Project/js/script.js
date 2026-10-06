/**
Dungeon Crasher
Malcolm Siné Tadonki

Move around and defeat your enemies with your overwhelming speed!
*/

"use strict";

// These are the configuration parameters for the game
let config = {
    // Automatically sets the game's display
    type: Phaser.AUTO,
    // Defines game dimensions
    width: 800,
    height: 800,
    // Creates basic physics
    physics: {
        default: 'arcade',
    },
    // Lists array of scenes and scales them appropriately
    scene: [Boot, TitleScreen, Play, BulletScene01],
    scale: {
        zoom: 2
    }
};
// Creates the game using the configuration
let game = new Phaser.Game(config);

/**
Unused
*/
function preload() {

}


/**
Unused
*/
function setup() {

}


/**
Unused
*/
function draw() {

}