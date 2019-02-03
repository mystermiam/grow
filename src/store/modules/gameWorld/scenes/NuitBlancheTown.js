import { Scene } from 'phaser'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

// Import Tilemaps here
import tiles1 from "./../assets/tilesets/Inside_C.png"
import tiles2 from './../assets/tilesets/Outside_A5.png'
import tiles3 from './../assets/tilesets/PathAndObjects.png'
import tiles4 from './../assets/tilesets/Outside_A1.png'
import tiles5 from './../assets/tilesets/Outside_A2.png'
import tiles6 from './../assets/tilesets/Outside_A3.png'
import tiles7 from './../assets/tilesets/Outside_B.png'
import tiles8 from './../assets/tilesets/Outside_C.png'
import tiles9 from './../assets/tilesets/town.png'
import tiles10 from './../assets/tilesets/wood_tileset.png'

import map from "./../assets/tilemaps/V2.json"

// Import Images here

// Import Sprites here 
import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

// Import Sprites.js here
import Player from './../phaserUtilities/player'

import Character from './../phaserUtilities/character'


// Steps to take: 1) Import into scenes/index.js 
export default class NuitBlancheTown extends Scene {

  constructor () {
    super({ key: 'NuitBlancheTown' })
  }

preload() {
	// Update which scene is currently active for Vue 
    let numberOfActiveScene = 0;
    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === this.sys.config.key){
        numberOfActiveScene = i;
      }
    }
    store.dispatch('player/changeActiveScene', numberOfActiveScene);

    // Load PLAYER
    this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
    
    // Load MAP
    // Make sure this has the right type
    // Create a basic map loader
    // Load 12 tilesets
    this.mapLoader('preload', 10)

    this.load.tilemapTiledJSON("map", map);
} // End of Preload

create() {
  // Loading TileMap
  this.map = this.make.tilemap({ key: "map" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)

  // Parameters need to be the same names as in JSOn file and in same order
  this.mapLoader('create', 
    'Inside_C', 
    'Outside_A5', 
    'PathAndObjects',
    'Outside_A1', 
    'Outside_A2', 
    'Outside_A3',  
    'Outside_B',
    'Outside_C',
    'town',    
    'wood_tileset'
    )
 
  // Object layers in Tiled let character embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
  
  // LOAD PLAYER
  this.player = new Player({
            scene: this,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

  // CAMERA
  const camera = this.cameras.main;
  camera.startFollow(this.player);
  camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
} // End of Create

update(time, delta) {
  // Update movement
  if(this.player.isAllowedToMove){
  this.player.move();
  }

  //Update dialogue function
  if(this.player.characterInteraction[0] === 'dialogue'){
    this[this.player.characterInteraction[1]].updateDialogue()
  } else if (this.player.characterInteraction[0] === 'option'){
    this[this.player.characterInteraction[1]].updateOptions()
  }
} // End of update

// Add functions of the Scene here
mapLoader(loadingPhase, numberOfTileSets){
if (loadingPhase === 'preload'){
  for (let i=1; i<numberOfTileSets + 1;i++){

    this.load.image('tiles' + i, 'tiles' + i );

  }
} else if (loadingPhase === 'create'){
  for (let i=1; i< arguments.length; i++){
    let tileSet = [];
    tileSet[i] = this.map.addTilesetImage(arguments[i], "tiles" + i);

    let belowLayer = [];
    let worldLayer = [];
    let aboveLayer = [];
    belowLayer[i] = this.map.createStaticLayer("Below Player", tileset[i], 0, 0);
    worldLayer[i] = this.map.createStaticLayer("World", tileset[i], 0, 0);
    aboveLayer[i] = this.map.createStaticLayer("Above Player", tileset[i], 0, 0);

  worldLayer[i].setCollisionByProperty({ collides: true });

  aboveLayer[i].setDepth(10);
  }
}
}

} // End of Export