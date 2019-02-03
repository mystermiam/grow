// Value guy: Execute actions like this 'placeWhereActionIs/ActionName'
// make it more flexible so that it can execute multiple functions, etc. / go to step 1 and call function ...
// Create a dialogue box to come back to character and give him at least 3 times feedback on this value

import Phaser from 'phaser'

import { Scene } from 'phaser'

import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

import TryOutJson from './../assets/tilemaps/TryOut.json'
import TryOutPNG from './../assets/tilesets/interior.png'


// Import TileSets here
//import house_inside from './../assets/tilesets/house_inside.png'
//import interior from './../assets/tilesets/interior.png'

// Import Tilemaps here
//import MusicHouse from './../assets/tilemaps/MusicHouse'
// Import Images here

// Import Sprites here 
import ValueGuy from './../assets/sprites/npc_ian.png'
// Import Sprite Classes here
import Player from './../phaserUtilities/player'

import Character from './../phaserUtilities/character'
 
export default class HouseOfMusicScene extends Scene {

  constructor () {
    super({ key: 'HouseOfMusicScene' })
  }

preload() {
    //This.sys.config.key gives the name of the scene; 
    let numberOfActiveScene = 0;
    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === this.sys.config.key){
        numberOfActiveScene = i;
      }
    }
    store.dispatch('player/changeActiveScene', numberOfActiveScene); 

    this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
    
    this.load.image('ValueGuy', ValueGuy);
    // Make sure this has the right type
    this.load.image("tiles1", TryOutPNG );
    this.load.tilemapTiledJSON("map1", TryOutJson);
}

create() {
  this.map = this.make.tilemap({ key: "map1" });

  // Find name inside of tilemap
  const tileset1 = this.map.addTilesetImage("interior", "tiles1");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tileset1, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tileset1, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tileset1, 0, 0);
 
  worldLayer.setCollisionByProperty({ collides: true });

  aboveLayer.setDepth(10);
  // 'Objects' is the name of the object layer, spawn point the name of the point
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
  

    // VALUE GUY

  let valueList = [
    ['Acceptance',''],
    ['Accomplishment',''],
    ['Accountability', ''],
    ['Accuracy', ''],
    ['Achievement', ''],
    ['Adaptability', ''],
    ['Alertness', ''],
    ['Altruism', ''],
    ['Ambition', ''],
    ['Amusement', ''],
    ['Assertiveness', ''],
    ['Attentive', ''],
    ['Awareness', ''],
  ];

  let currentValues = this.generateValues(3, 13);

  let dialogueValueGuy = [
  ['Thomas the Value Guy','Hey there! My name is Thomas the Value Guy, each week you can choose one value here to reflect upon.'],
  ['option', 
    [valueList[currentValues[0]][0] + ' - ' + valueList[currentValues[0]][1], [2, "dispatch('endConversation')", 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray' ]], 
    [valueList[currentValues[1]][0] + ' - ' + valueList[currentValues[1]][1], [2]], 
    [valueList[currentValues[2]][0] + ' - ' + valueList[currentValues[2]][1], [2]]],
  ['Thomas the Value Guy','Good Choice! Come back once you have learned something about this value!']];

  this.ValueGuy = new Character({
          scene: this,
          key: 'ValueGuy',
          x: 130 ,
          y: 140,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'ValueGuy'],
            ['interaction', 'dialogue'],
            ['dialogue', dialogueValueGuy],
            ['dialogueStartsAt', 0],
            ['size', [70,70]],
            ['offSet', [0,0]],
          ]
  }); 




}

update(time, delta) {
  if(this.player.isAllowedToMove){
  this.player.move();
  }

  if(this.player.characterInteraction[0] === 'dialogue'){
    this[this.player.characterInteraction[1]].updateDialogue()
  } else if (this.player.characterInteraction[0] === 'option'){
    this[this.player.characterInteraction[1]].updateOptions()
  }
}



generateValues(numberOfValues, valueListLength){
  let currentValues = [];
  let repetition = 0;

  do {
  
  let value = Math.floor(Math.random() * valueListLength)
  
  if (currentValues.indexOf(value) < 0){
    currentValues.push(value);
    repetition++
  }

  } while (repetition < numberOfValues)

  return currentValues
}

}