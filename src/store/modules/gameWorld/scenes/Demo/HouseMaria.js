import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import TryOutJson from './../../assets/tilemaps/TryOut.json'
import TryOutPNG from './../../assets/tilesets/interior.png'


import maria from './../../assets/sprites/girlcomplete.png'

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import external functions
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'


// Steps to take: 1) Import into scenes/index.js 
export default class HouseMaria extends Scene {

  constructor () {
    super({ key: 'HouseMaria' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Make sure this has the right type
    this.load.spritesheet('maria', maria, {frameWidth: 48, frameHeight: 48});
    this.load.image("tiles1", TryOutPNG );
    this.load.tilemapTiledJSON("map1", TryOutJson);
} // End of Preload

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

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);







 let MariaDialogue = [
['Discutor', "Hey there wanderer, would you like to work more efficiently?"],
['option', 
  ['Sure, I would like to learn more about learning', [4]],
  ['I want to have a tool that can help me!', [2]],  
  ["No, I'm currently not interested", ["dispatch('endConversation')"]]
],
['Discutor', 'Then check out this new tool'],
['option', 
  ['try out tool', ["dispatch('endConversation')", 'http://grow.cri-paris.org/#/pomodoro']], 
  ['Leave him behind', ["dispatch('endConversation')"]]
],
['Discutor', 'Did you ever hear about the last lecture of Randy Pusch from MIT?'],
['option', 
  ['No I have never heard about it', [6]], 
  ['Actually I know this one already', [7]]
],
['option', 
  ['let me check it out', ["dispatch('endConversation')", 'https://www.youtube.com/watch?v=ji5_MqicxSo']], 
  ['Actually I have better things to do', ["dispatch('endConversation')"]]
],
['Discutor', "That's too bad, that's all the content I know. Maybe come back later, when my content is updated"],

];


this.Maria = new Character({
          scene: this,
          key: 'maria',
          x: 200,
          y: 55,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Maria'],
            ['interaction', 'dialogue'],
            ['dialogue', MariaDialogue],
            ['dialogueStartsAt', 0],
            ['size', [48,48]],
            ['offSet', [0,0]],
          ]
      });

















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