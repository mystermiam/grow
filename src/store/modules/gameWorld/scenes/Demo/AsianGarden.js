import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from './../../../../index'

// Import Tilemaps here

import tiles0 from "./../../assets/tilesets/SF_Outside_C.png"
import tiles1 from "./../../assets/tilesets/asian.png"
import tiles2 from "./../../assets/tilesets/955940trees2.png"
import tiles3 from "./../../assets/tilesets/Outside_A2.png"
import tiles4 from "./../../assets/tilesets/Outside_A1.png"
import tiles5 from "./../../assets/tilesets/Outside_A5.png"
import tiles6 from "./../../assets/tilesets/Outside_B.png"
import tiles7 from "./../../assets/tilesets/mack_char01.png"

import map from "./../../assets/tilemaps/asian.json"

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import external functions
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'

export default class AsianGarden extends Scene {

  constructor () {
    super({ key: 'AsianGarden' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type
    this.load.image("tiles0", tiles0 );
    this.load.image("tiles1", tiles1 );
    this.load.image("tiles2", tiles2 );
    this.load.image("tiles3", tiles3 );
    this.load.image("tiles4", tiles4 );
    this.load.image("tiles5", tiles5 );
    this.load.image("tiles6", tiles6 );
    this.load.image("tiles7", tiles7 );

    this.load.tilemapTiledJSON("AsianGarden", map);
} // End of Preload

create() {
  // Loading TileMap
  this.map = this.make.tilemap({ key: "AsianGarden" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tilesetAsian0 = this.map.addTilesetImage("SF_Outside_C", "tiles0");
  const tilesetAsian1 = this.map.addTilesetImage("asian", "tiles1");
  const tilesetAsian2 = this.map.addTilesetImage("955940trees2", "tiles2");
  const tilesetAsian3 = this.map.addTilesetImage("Outside_A2", "tiles3");
  const tilesetAsian4 = this.map.addTilesetImage("Outside_A1", "tiles4");
  const tilesetAsian5 = this.map.addTilesetImage("Outside_A5", "tiles5");
  const tilesetAsian6 = this.map.addTilesetImage("Outside_B", "tiles6");
  const tilesetAsian7 = this.map.addTilesetImage("mack_char01", "tiles7");

  let tilesets = [tilesetAsian0, tilesetAsian1, tilesetAsian2, tilesetAsian3,  tilesetAsian4, tilesetAsian5, tilesetAsian6, tilesetAsian7]
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tilesets, 0, 0);
  const noCollisionLayer = this.map.createStaticLayer("No Collision Layer", tilesets, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tilesets, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tilesets, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

} // End of Create

update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!







} // End of Export